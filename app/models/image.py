from .db import db
from datetime import datetime

class Image(db.Model):
  __tablename__ = "images"

  id = db.Column(db.Integer, primary_key=True)
  car_id = db.Column(db.Integer, db.ForeignKey("cars.id"))
  url = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

  car = db.relationship("Car", back_populates="images")

  def to_dict(self):
      return {
        "id": self.id,
        "car_id": self.car_id,
        "url": self.url,
      }
