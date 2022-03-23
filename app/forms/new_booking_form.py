from wsgiref.validate import validator
from flask import Flask
from flask_wtf import FlaskForm
from wtforms import DateField
from wtforms.validators import DataRequired, ValidationError
from datetime import datetime, date, timedelta


def validate_start_date(form, field):
    if field.data < date.today():
        raise ValidationError('Must Select A Future Date')
    elif form.data['start_date'] > form.data['end_date']:
        print('this is start_date', form.data['start_date'])
        raise ValidationError('Start Date Cannot Be After The End Date')

def validate_end_date(form, field):
    start = form.data['start_date']
    end = form.data['end_date']
    td = end - start
    if td > timedelta(days = 5):
        raise ValidationError('Booking Cannot Exceed 5 Days, Please Reduce The Number Of Days')

class TryCarForm(FlaskForm):
    start_date = DateField("start_date", validators=[DataRequired(message="Valid Start Date is Required"), validate_start_date])
    end_date = DateField("end_date", validators=[DataRequired(message="Valid End Date is Required"), validate_end_date])
