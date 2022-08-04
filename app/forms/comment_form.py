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
    user_id = IntegerField("user_id", validators=[DataRequired()])
    joke_id = IntegerField("joke_id", validators=[DataRequired()])
    content = StringField("content", validators=[DataRequired(), Length(min=1, max=280)])


class EditCommentForm(FlaskForm):
    content = StringField("content", validators=[DataRequired(), Length(min=1, max=280)])
