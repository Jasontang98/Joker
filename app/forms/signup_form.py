from flask_wtf import FlaskForm
from sqlalchemy import DateTime
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
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

def displayname_exists(form, field):
    # Checking if displayname is already in use
    display_name = field.data
    user = User.query.filter(User.display_name == display_name).first()
    if user:
        raise ValidationError('Displayname is already in use.')

class SignUpForm(FlaskForm):
    display_name = StringField('displayname', validators=[DataRequired(), displayname_exists])
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    bio = StringField("Bio")
    header = StringField("Header Photo")
    prof_pic_url = StringField("Profile Picture")
    location = StringField("Location")
    birthday = DateField("Birthday")
    joined = DateTime('Created At')
