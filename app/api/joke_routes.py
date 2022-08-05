from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Joke, Comment, comment, db
from app.config import Config
from app.aws_s3 import *
from app.forms.joke_form import PostJokeForm, EditJokeForm
from app.forms.comment_form import PostCommentForm, EditCommentForm
from datetime import datetime

joke_routes = Blueprint('jokes', __name__)


# Route all the jokes
@joke_routes.route('/')
def all_jokes():
    jokes = Joke.query.all()
    data = [joke.to_dict() for joke in jokes]
    return {"jokes": data}


# Get single joke
@joke_routes.route('/<int:id>')
# @login_required
def get_single_joke(id):
    joke = Joke.query.get(id)
    if joke:
        return joke.to_dict()
    else:
        return 'Joke not found'


# Post a joke
@joke_routes.route('/post', methods=['POST'])
# @login_required
def post_joke():
    form = PostJokeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        file = request.files["image_url"]
        if file:
            file_url = upload_file_to_s3(file, Config.S3_BUCKET)
            new_joke = Joke(
                user_id=form.user_id.data,
                content=form.content.data,
                image_url=file_url,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            db.session.add(new_joke)
            db.session.commit()
            return new_joke.to_dict()
        else:
            return 'No File Attached!'


# Edit a joke
@joke_routes.route('/edit/<int:id>', methods=['PUT'])
# @login_required
def edit_joke(id):
    form = EditJokeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        joke = Joke.query.get(id)
        joke.content = form.content.data
        db.session.commit()
        return joke.to_dict()


# Delete a joke
@joke_routes.route('/delete/<int:id>', methods=['DELETE'])
# @login_required
def delete_joke(id):
    joke = Joke.query.get(id)
    old_joke = joke.to_dict()
    db.session.delete(joke)
    db.session.commit()
    return old_joke


# Routes to get all Comments
@joke_routes.route('/<int:id>/comments')
# @login_required
def all_comments(id):
    comments = Comment.query.filter_by(joke_id=id).all()
    data = [comment.to_dict() for comment in comments]
    return {'comments': data}


# Routes to get single Comment
@joke_routes.route('/<int:id>/comments/<int:comment_id>')
# @login_required
def get_single_comment(id, comment_id):
    comment = Comment.query.get(comment_id)
    return comment.to_dict()


# Post a Comment
@joke_routes.route('/<int:id>', methods=['POST'])
# @login_required
def post_comment(id):
    form = PostCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        file = request.files["image_url"]
        if file:
            file_url = upload_file_to_s3(file, Config.S3_BUCKET)
            comment = Comment(
                user_id=form.user_id.data,
                joke_id=form.joke_id.data,
                content=form.content.data,
                image_url=file_url,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            db.session.add(comment)
            db.session.commit()
            return comment.to_dict()
        else:
            return 'No File Attached!'


# Edit a Comment
@joke_routes.route('/<int:id>/comments/<int:comment_id>', methods=['PUT'])
# @login_required
def edit_comment(id, comment_id):
    comment = Comment.query.get(comment_id)
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.content=form.content.data,
        comment.created_at=datetime.now(),
        comment.updated_at=datetime.now()
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()


# Delete a Comment
@joke_routes.route('/<int:id>/comments/<int:comment_id>', methods=['DELETE'])
# @login_required
def delete_comment(id, comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
