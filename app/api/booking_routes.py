from crypt import methods
from wsgiref import validate
from flask import Blueprint, abort, session, request
from flask_login import current_user
from app.models import Car, User, Booking, db
from app.forms import TryCarForm
from wtforms.validators import DataRequired, ValidationError


booking_routes = Blueprint('bookings', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

# the id here is car id
@booking_routes.route('/<int:id>', methods=['POST'])
def new_booking(id):
    form = TryCarForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    curr_user_id=current_user.id

    if form.validate_on_submit():
        existing_bookings = Booking.query.filter_by(car_id=id).all()
        curr_bookings = [existing_booking.to_dict() for existing_booking in existing_bookings]
        selected_start_date = int((form.data['start_date']).strftime("%Y%m%d"))
        selected_end_date = int((form.data['end_date']).strftime("%Y%m%d"))

        for i in range(len(curr_bookings)):
            curr_booking = curr_bookings[i]
            curr_booking_user = curr_booking['user_id']
            curr_booking_start_dates = int((curr_booking['start_date']).strftime("%Y%m%d"))
            curr_booking_end_dates = int((curr_booking['end_date']).strftime("%Y%m%d"))

            # SS <= EE  & E2 < SE
            if(curr_booking_user == curr_user_id):
                errMessages = ['You have already tried this car']
                return {'errors': errMessages}



            if((selected_start_date <= curr_booking_end_dates) and (curr_booking_start_dates < selected_end_date)):
                errMessages = ['Car is already Booked for those dates']
                return {'errors': errMessages}

        booking = Booking(user_id=curr_user_id, car_id=id, start_date=form.data['start_date'], end_date=form.data['end_date'])
        db.session.add(booking)
        db.session.commit()

        return booking.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}

# the id here is booking id
@booking_routes.route('/<int:id>', methods=['PUT'])
def edit_booking(id):
    form = TryCarForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    curr_user_id=current_user.id
    car_id = request.json['carId']

    booking = Booking.query.get(id)

    if form.validate_on_submit():
        existing_bookings = Booking.query.filter_by(car_id=car_id).all()
        curr_bookings = [existing_booking.to_dict() for existing_booking in existing_bookings]
        selected_start_date = int((form.data['start_date']).strftime("%Y%m%d"))
        selected_end_date = int((form.data['end_date']).strftime("%Y%m%d"))

        for i in range(len(curr_bookings)):
            curr_booking = curr_bookings[i]
            curr_booking_user = curr_booking['user_id']
            curr_booking_start_dates = int((curr_booking['start_date']).strftime("%Y%m%d"))
            curr_booking_end_dates = int((curr_booking['end_date']).strftime("%Y%m%d"))

            # SS <= EE  & E2 < SE

            if((selected_start_date <= curr_booking_end_dates) and (curr_booking_start_dates < selected_end_date)):
                errMessages = ['For Insurance Purposes You may not select new dates within your exisitng booking, please select new range of dates']
                return {'errors': errMessages}

        booking.user_id = curr_user_id
        booking.car_id = car_id
        booking.start_date = form.data['start_date']
        booking.end_date = form.data['end_date']

        db.session.add(booking)
        db.session.commit()

        return booking.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}

@booking_routes.route('/user/<int:id>')
def get_user_bookings(id):
    user_bookings = Booking.query.filter(Booking.user_id == id).all()
    booking_details = [booking_details.to_dict() for booking_details in user_bookings]

    cars = []
    for i in range(len(booking_details)):
        each_user_booking = booking_details[i]
        car_id = each_user_booking['car_id']
        car = Car.query.get(car_id)
        car_dict = car.to_dict()
        cars.append(car_dict)
    print('this is cars::::', cars)

    return {"carBookings" : cars}

@booking_routes.route('/user/reservations/<int:id>')
def get_user_reservations(id):
    user_bookings = Booking.query.filter(Booking.user_id == id).all()
    booking_details = [booking_details.to_dict() for booking_details in user_bookings]

    return {"reservations" : booking_details}

@booking_routes.route('/<int:id>', methods=['DELETE'])
def delete_car(id):
    booking = Booking.query.get(id)

    if booking is None:
        abort(404)

    db.session.delete(booking)
    db.session.commit()


    return { id: booking.id }

@booking_routes.route('/car/<int:id>')
def get_car_bookings(id):
    existing_bookings = Booking.query.filter_by(car_id=id).all()
    curr_bookings = [existing_booking.to_dict() for existing_booking in existing_bookings]

    return {"carBookings" : curr_bookings}
