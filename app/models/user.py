from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    cars = db.relationship("Car", back_populates="user", cascade="all, delete")
    bookings = db.relationship("Booking", back_populates="user", cascade="all, delete, delete-orphan", lazy='joined')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        all_bookings = [booking.to_dict() for booking in self.bookings]
        all_cars = [car.to_dict() for car in self.cars]

        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'cars': all_cars,
            'bookings': all_bookings
        }
