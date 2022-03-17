from wsgiref.validate import validator
from flask import Flask
from flask_wtf import FlaskForm
from wtforms import SelectField, IntegerField, StringField
from wtforms.validators import DataRequired, InputRequired

class NewCarForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    price = IntegerField("price", validators=[DataRequired()])
    mileage = IntegerField("mileage", validators=[DataRequired()])
    ext_color = SelectField("ext_color", validators=[InputRequired(message='Please select an exterior color.')])
    int_color = SelectField("int_color", validators=[InputRequired(message='Please select an interior color.')])
    body_style = SelectField("body_style", validators=[InputRequired(message='Please select a body style.')])
    fuel_type = SelectField("fuel_type", validators=[InputRequired(message='Please select a fuel type.')])
    year = SelectField("year", validators=[DataRequired()])
    make = SelectField("make", validators=[InputRequired(message='Please select a manufacturer.')])
    model = SelectField("model", validators=[InputRequired(message='Please select the model.')])
    zip = IntegerField("zip", validators=[DataRequired()])
    imageUrl = StringField("imageUrl", validators=[InputRequired(message='Please enter an image url.')])
