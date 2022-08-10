from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import ValidationError, Length, DataRequired


class PostJokeForm(FlaskForm):
    user_id = IntegerField("User ID", validators=[DataRequired()])
    content = StringField("Content", validators=[Length(max=280, message="Joke must be between 1 and 280.")])

class EditJokeForm(FlaskForm):
    content = StringField("Content", validators=[Length(max=280)])
