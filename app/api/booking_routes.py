from crypt import methods
from wsgiref import validate
from flask import Blueprint, abort, session, request
from flask_login import current_user
from app.models import Car, Booking, db
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
            curr_booking_start_dates = int((curr_booking['start_date']).strftime("%Y%m%d"))
            curr_booking_end_dates = int((curr_booking['end_date']).strftime("%Y%m%d"))

            # SS <= EE  & E2 < SE

            if((selected_start_date <= curr_booking_end_dates) and (curr_booking_start_dates < selected_end_date)):
                errMessages = ['Car is already Booked for those dates']
                return {'errors': errMessages}

        booking = Booking(user_id=curr_user_id, car_id=id, start_date=form.data['start_date'], end_date=form.data['end_date'])
        db.session.add(booking)
        db.session.commit()

        return booking.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}
