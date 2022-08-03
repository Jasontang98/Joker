from datetime import datetime
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Joke, db
from app.config import Config
from app.aws_s3 import *
from app.forms.post_joke_form import JokeForm

joke_routes = Blueprint('jokes', __name__)


# Route all the jokes
@joke_routes.route('/')
def all_jokes():
    jokes = Joke.query.all()
    return {joke.id: joke.to_dict() for joke in jokes}


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
    form = JokeForm()
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
# @joke_routes.route('/edit/<int:id>', methods=['PUT'])
# # @login_required
# def
