from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import ValidationError, Length, DataRequired

# def joke_length(form, field):
#     joke = field.data
#     if len(joke) > 280:
#         raise ValidationError('Joke must be between 1 and 280 characters.')

class PostJokeForm(FlaskForm):
    user_id = IntegerField("User ID", validators=[DataRequired()])
    content = StringField("Content", validators=[Length(max=280, message="Joke must be between 1 and 280.")])

class EditJokeForm(FlaskForm):
    # user_id = IntegerField("user_id", validators=[DataRequired()])
    content = StringField("Content", validators=[Length(max=280)])
