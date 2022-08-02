from email.mime import image
from datetime import datetime
from turtle import back
from .db import db

class Joke(db.Model):
    __tablename__ = 'jokes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(280))
    image_url = db.Column(db.String())
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    # Relationships
    users = db.relationship("User", back_populates="jokes")
    comments = db.relationship("Comment", back_populates="jokes", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user,
            "content": self.content,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
