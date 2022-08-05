from app.models import comment
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    display_name = db.Column(db.String(20), unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(160))
    header = db.Column(db.String())
    prof_pic_url = db.Column(db.String(255), default="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png")
    location = db.Column(db.String(50))
    birthday = db.Column(db.String(30))
    joined = db.Column(db.DateTime)

    # Relationships
    jokes = db.relationship("Joke", back_populates="users")
    comments = db.relationship("Comment", back_populates="users")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'display_name': self.display_name,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'header': self.header,
            'prof_pic_url': self.prof_pic_url,
            'location': self.location,
            'birthday': self.birthday,
            'joined': self.joined
        }
