from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import ValidationError, Length, DataRequired


class PostCommentForm(FlaskForm):
    user_id = IntegerField("User ID", validators=[DataRequired()])
    joke_id = IntegerField("Joke ID", validators=[DataRequired()])
    content = StringField("Content", validators=[Length(max=280, message="Comment must be between 1 and 280.")])


class EditCommentForm(FlaskForm):
    comment_id = IntegerField("Comment ID", validators=[DataRequired()])
    content = StringField("Content", validators=[Length(max=280)])
