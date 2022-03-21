from operator import methodcaller
from flask import Blueprint, jsonify, session, request
from flask_login import current_user
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

@car_routes.route('/')
def all_cars():
    cars = Car.query.all()
    cars_dicts = [car.to_dict() for car in cars]

    return { "cars": cars_dicts }

@car_routes.route('/<int:id>')
def single_car(id):
    cars = Car.query.get(id)
    backend_car = cars.to_dict()


    return { "cars": backend_car }

@car_routes.route('/newCar', methods=['POST'])
def new_car():
    form = NewCarForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    curr_user_id=current_user.id
    print(form.data)
    print('this is curr', curr_user_id)
    if form.validate_on_submit():
        car = Car(user_id=curr_user_id, price=form.data['price'], mileage=form.data['mileage'],
                ext_color=form.data['ext_color'], int_color=form.data['int_color'],
                body_style=form.data['body_style'], fuel_type=form.data['fuel_type'],
                year=form.data['year'], make=form.data['make'], model=form.data['model'], zip=form.data['zip']
                )
        car_image = Image(car=car, url=form.data['imageUrl'])

        db.session.add(car)
        db.session.add(car_image)

        db.session.commit()

        return car.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}


@car_routes.route('/users/<int:id>')
def user_cars(id):
    cars = Car.query.filter_by(user_id=id).all()
    cars_dicts = [car.to_dict() for car in cars]

    return { "cars": cars_dicts }
