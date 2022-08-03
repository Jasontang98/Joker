from sqlalchemy import DateTime
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import ValidationError, Length

def joke_length(form, field):
    joke = field.data
    if len(joke):
        raise ValidationError('Joke must be between 1 and 280 characters.')

class JokeForm(FlaskForm):
    content = StringField("Joke", validators=[Length(max=280), joke_length])
    created_at = DateTime('Created At')
    updated_at = DateTime('Updated At')
