from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import ValidationError, Length, DataRequired

class EditJokeForm(FlaskForm):
    # user_id = IntegerField("user_id", validators=[DataRequired()])
    content = StringField("content", validators=[DataRequired(), Length(min=1, max=280)])
