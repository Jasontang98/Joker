from app.models import db, Comment


def seed_comments():
    comments = [
        {
        'user_id': 1,
        'joke_id': 1,
        'content': "HAHAHAHA",
        'created_at': "2022-08-06 12:15:30",
        'updated_at': "2022-08-06 12:15:30"
        },
        {
        'user_id': 1,
        'joke_id': 1,
        'content': "That was so bad.",
        'created_at': "2022-08-06 12:15:30",
        'updated_at': "2022-08-06 12:15:30"
        },
        {
        'user_id': 2,
        'joke_id': 2,
        'content': "That's pretty good",
        'created_at': "2022-08-06 12:15:30",
        'updated_at': "2022-08-06 12:15:30"
        },
        {
        'user_id': 2,
        'joke_id': 2,
        "image_url": "https://cdns-images.dzcdn.net/images/artist/a423dd42b7394eeacc882be8ac633eee/500x500.jpg",
        'created_at': "2022-08-06 12:15:30",
        'updated_at': "2022-08-06 12:15:30"
        },
        {
        'user_id': 3,
        'joke_id': 3,
        'content': "I hate that I like it.",
        'created_at': "2022-08-06 12:15:30",
        'updated_at': "2022-08-06 12:15:30"
        },
        {
        'user_id': 3,
        'joke_id': 3,
        'content': "💀💀💀",
        'created_at': "2022-08-06 12:15:30",
        'updated_at': "2022-08-06 12:15:30"
        },
    ]

    for comment in comments:
        db.session.add(Comment(**comment))
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
