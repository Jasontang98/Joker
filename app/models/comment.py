from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    joke_id = db.Column(db.Integer, db.ForeignKey("jokes.id"), nullable=False)
    content = db.Column(db.String(280), nullable=False)
    image_url = db.Column(db.String())
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    # Relationships
    users = db.relationship("User", back_populates="comments")
    jokes = db.relationship("Joke", back_populates="comments")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "joke_id": self.joke_id,
            # "joke": self.jokes.to_dict(),
            "content": self.content,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
