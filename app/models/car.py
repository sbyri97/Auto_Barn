from .db import db
from datetime import datetime

class Car(db.Model):
  __tablename__ = "cars"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  price = db.Column(db.Integer, nullable=False)
  mileage = db.Column(db.Integer, nullable=False)
  ext_color = db.Column(db.String(100), nullable=False)
  int_color = db.Column(db.String(100), nullable=False)
  body_style = db.Column(db.String(100), nullable=False)
  fuel_type = db.Column(db.String(100), nullable=False)
  year = db.Column(db.Integer, nullable=False)
  make = db.Column(db.String(100), nullable=False)
  model = db.Column(db.String(100), nullable=False)
  zip = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

  user = db.relationship("User", back_populates="cars")
  bookings = db.relationship("Booking", back_populates="car", cascade="all, delete")
  images = db.relationship("Image", back_populates="car", cascade="all, delete, delete-orphan", lazy='joined')

  def to_dict(self):
      return {
        "id": self.id,
        "user_id": self.user_id,
        "price": self.price,
        "mileage": self.mileage,
        "ext_color": self.ext_color,
        "int_color": self.int_color,
        "body_style": self.body_style,
        "fuel_type": self.fuel_type,
        "year": self.year,
        "make": self.make,
        "model": self.model,
        "zip": self.zip,
      }
