from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import ValidationError, Length, DataRequired

# def comment_empty(form, field):
#     comment = field.data
#     if len(comment) == 0:
#         raise ValidationError('Please provide a comment.')


# def comment_length(form, field):
#     comment = field.data
#     if len(comment) > 280
#         raise ValidationError('Comment is too long.')


class PostCommentForm(FlaskForm):
    user_id = IntegerField("User ID", validators=[DataRequired()])
    joke_id = IntegerField("Joke ID", validators=[DataRequired()])
    content = StringField("Content", validators=[DataRequired(), Length(max=280, message="Comment must be between 1 and 280.")])


class EditCommentForm(FlaskForm):
    content = StringField("Content", validators=[DataRequired(), Length(max=280)])
