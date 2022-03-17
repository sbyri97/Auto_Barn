from operator import methodcaller
from flask import Blueprint, jsonify, session, request
from app.models import Car, Image, db
from app.forms import NewCarForm

car_routes = Blueprint('cars', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@car_routes.route('/newCar', methods=['POST'])
def new_car():
    form = NewCarForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        # car = Car(user_id=form.data['user_id'], price=form.data['price'], mileage=form.data['mileage'],
        #         ext_color=form.data['ext_color'], int_color=form.data['int_color'],
        #         body_style=form.data['body_style'], fuel_type=form.data['fuel_type'],
        #         year=form.data['year'], make=form.data['make'], model=form.data['model'], zip=form.data['zip']
        #         )

        # db.session.add(car)
        # ordered_car = Car.query.order_by(Car.id.desc()).first()
        # car_id = ordered_car.id
        # car_image = Image(car_id=car_id, image_url=form.data['image_url'])
        # db.session.add(car_image)
        # db.session.commit()

        # return car.to_dict()
    # else:
        return {'errors': validation_errors_to_error_messages(form.errors)}
