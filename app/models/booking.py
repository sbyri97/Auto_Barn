from .db import db
from datetime import datetime

class Booking(db.Model):
  __tablename__ = "bookings"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  car_id = db.Column(db.Integer, db.ForeignKey("cars.id"))
  start_date = db.Column(db.DateTime, default=datetime.now(), nullable=False)
  end_date = db.Column(db.DateTime, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

  user = db.relationship("User", back_populates="bookings")
  car = db.relationship("Car", back_populates="bookings")

  def to_dict(self):
      return {
        "id": self.id,
        "user_id": self.user_id,
        "car_id": self.car_id,
        "start_date": self.start_date,
        "end_date": self.end_date,
      }
