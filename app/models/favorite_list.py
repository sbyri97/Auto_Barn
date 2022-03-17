# from .db import db
# from datetime import datetime
# from .favorite import favorites

# class FavoriteList(db.Model):
#   __tablename__ = "favlists"

#   id = db.Column(db.Integer, primary_key=True)
#   user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
#   created_at = db.Column(db.DateTime, default=datetime.now())
#   updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

# #   user = db.relationship("User", back_populates="favlists")
# #   car = db.relationship("Car", back_populates="favlists",
# #   secondary=favorites,
# #   primaryjoin=(favorites.playlist_id == id)
# #   )

#   def to_dict(self):
#       return {
#         "id": self.id,
#         "user_id": self.user_id,
#       }
