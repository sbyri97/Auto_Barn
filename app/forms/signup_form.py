from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(message='Enter Your Name'),
    Length(max=255, message='Length cant exceeed 255 characters')])
    username = StringField(
        'username', validators=[DataRequired(message='Enter A Username'), username_exists])
    email = StringField('email', validators=[DataRequired(message='Enter An Email'), user_exists,
            Length(min=4, message='email must be at least 4 characters long'),
            Length(max=255, message='Email cant exceeed 255 characters'),
            Email(message='Email Must Be A Valid Email Address.')])
    password = StringField('password',
                validators=[DataRequired(message='Password is required'),
                EqualTo('confirm_password', message='Passwords must match.'),
                Length(min=5, message='Password must be at least 5 characters long'),
                Length(max=255, message='Password cant exceeed 255 characters')])
    confirm_password = StringField('confirm_password',
        validators=[DataRequired(message='Please confirm your password.')])
