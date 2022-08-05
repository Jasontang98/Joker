from app.models import db, Joke


def seed_jokes():
    jokes = [
        {
        'user_id': 1,
        'content': "Why was six afraid of seven? Because 7 8 9!",
        'created_at': "2022-08-06 12:15:30",
        'updated_at': "2022-08-06 12:15:30"
        },
        {
        'user_id': 1,
        'content': "What did the fish say when he swam into a wall? Dam.",
        'created_at': "2022-08-06 12:15:30",
        'updated_at': "2022-08-06 12:15:30"
        },
        {
        'user_id': 2,
        'content': "What do you call a fish with no eyes? A fsh.",
        'image_url': "https://images-cdn.9gag.com/photo/aNpKN83_700b.jpg",
        'created_at': "2022-08-06 12:15:30",
        'updated_at': "2022-08-06 12:15:30"
        },
        {
        'user_id': 2,
        'content': "Why does Snoop Dogg use an umbrella? For drizzle.",
        'created_at': "2022-08-06 12:15:30",
        'updated_at': "2022-08-06 12:15:30"
        },
        {
        'user_id': 3,
        'content': "What do you call an alligator in a vest? An in-vest-igator.",
        'image_url': "https://m.media-amazon.com/images/I/61FAYxXoMtL._AC_SY580_.jpg",
        'created_at': "2022-08-06 12:15:30",
        'updated_at': "2022-08-06 12:15:30"
        },
        {
        'user_id': 3,
        'content': "Why don't dinosaurs talk? 💀 Because they're dead. 💀",
        'created_at': "2022-08-06 12:15:30",
        'updated_at': "2022-08-06 12:15:30"
        },
    ]

    for joke in jokes:
        db.session.add(Joke(**joke))
    db.session.commit()


def undo_jokes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
