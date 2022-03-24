from wsgiref.validate import validator
from flask import Flask
from flask_wtf import FlaskForm
from wtforms import SelectField, IntegerField, StringField
from wtforms.validators import DataRequired, InputRequired, url, ValidationError, Length, NumberRange
import re

def validate_image_url(form, field):
    imageUrl = field.data

    url = re.search(r'\.(png|jpg|jpeg|gif)$', imageUrl.lower())

    if not url:
        raise ValidationError('The image must be a .jpg, .jpeg, .png, .gif type')

def validate_price_and_mileage(form, field):
    price = field.data
    mileage = field.data



class NewCarForm(FlaskForm):
    price = IntegerField("price", validators=[DataRequired(message="Price can't be $0"), NumberRange(min=1000, max=99999999, message='Price must be at least $1,000 and under $99,999,999')])
    mileage = IntegerField("mileage", validators=[DataRequired(message="Car must have at least 1 mile"), NumberRange(min=1, max=999999, message='Mileage must be under 999,999 miles')])
    ext_color = StringField("ext_color", validators=[InputRequired(message='Please select an exterior color.')])
    int_color = StringField("int_color", validators=[InputRequired(message='Please select an interior color.')])
    body_style = StringField("body_style", validators=[InputRequired(message='Please select a body style.')])
    fuel_type = StringField("fuel_type", validators=[InputRequired(message='Please select a fuel type.')])
    year = IntegerField("year", validators=[DataRequired(message="Select the year of your vehicle")])
    make = StringField("make", validators=[InputRequired(message='Please select a manufacturer(make).')])
    model = StringField("model", validators=[InputRequired(message='Please select the model.')])
    zip = StringField("zip", validators=[DataRequired(message="Enter a valid 5 digit zip code")])
    imageUrl = StringField("imageUrl", validators=[InputRequired(message='Please enter an image url.'), Length(min=1, max=255, message='Image Url Cannot Exceed 255 Characters'),
                url(message='Please ensure that your url starts with https://'), validate_image_url])
