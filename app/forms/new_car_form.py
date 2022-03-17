from wsgiref.validate import validator
from flask import Flask
from flask_wtf import FlaskForm
from wtforms import SelectField, IntegerField, StringField
from wtforms.validators import DataRequired, InputRequired

class NewCarForm(FlaskForm):
    price = IntegerField("price", validators=[DataRequired(message="yoooo")])
    mileage = IntegerField("mileage", validators=[DataRequired(message="gd")])
    ext_color = StringField("ext_color", validators=[InputRequired(message='Please select an exterior color.')])
    int_color = StringField("int_color", validators=[InputRequired(message='Please select an interior color.')])
    body_style = StringField("body_style", validators=[InputRequired(message='Please select a body style.')])
    fuel_type = StringField("fuel_type", validators=[InputRequired(message='Please select a fuel type.')])
    year = IntegerField("year", validators=[DataRequired(message="yesss")])
    make = StringField("make", validators=[InputRequired(message='Please select a manufacturer.')])
    model = StringField("model", validators=[InputRequired(message='Please select the model.')])
    zip = IntegerField("zip", validators=[DataRequired(message="yup")])
    imageUrl = StringField("imageUrl", validators=[InputRequired(message='Please enter an image url.')])
