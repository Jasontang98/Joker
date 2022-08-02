from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    #1
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        display_name='Demo',
        bio="Love everyone",
        header="https://content.wepik.com/statics/7018142/preview-page0.jpg",
        prof_pic_url="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
        location='Oakland, CA',
        birthday="2022-08-02",
        joined='2022-08-02 12:12:22'
        )
    #2
    kimberly = User(
        username='Kimberly',
        email='kimberly@aa.io',
        password='password',
        display_name='Kimberly',
        bio="Love none",
        header="https://content.wepik.com/statics/7018142/preview-page0.jpg",
        prof_pic_url="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
        location='Oakland, CA',
        birthday="2000-10-12",
        joined='2022-08-02 12:12:22'
    )
    #3
    jason = User(
        username='Jason',
        email='jason@aa.io',
        password='password',
        display_name='Jason',
        bio="Yeet",
        header="https://content.wepik.com/statics/7018142/preview-page0.jpg",
        prof_pic_url="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
        location='Oakland, CA',
        birthday="1998-08-06",
        joined='2022-08-02 12:12:22'
        )

    db.session.add(demo)
    db.session.add(kimberly)
    db.session.add(jason)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
