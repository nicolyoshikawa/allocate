from app.models import db, environment, SCHEMA, User, Friend
from sqlalchemy.sql import text

def seed_friends():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    user5 = User.query.get(5)
    user6 = User.query.get(6)
    user7 = User.query.get(7)
    user8 = User.query.get(8)
    user9 = User.query.get(9)
    user10 = User.query.get(10)


    # User1 (Demo User Seed) #######
    friend1 = Friend(user=user1, friend=user2, status='friends')
    friend2 = Friend(user=user1, friend=user3, status='friends')
    friend3 = Friend(user=user1, friend=user6, status='pending')
    friend4 = Friend(user=user1, friend=user10, status='friends')

    friend5 = Friend(user=user2, friend=user3, status='pending')
    friend6 = Friend(user=user2, friend=user4, status='friends')
    friend7 = Friend(user=user2, friend=user6, status='friends')
    friend8 = Friend(user=user2, friend=user9, status='friends')

    friend9 = Friend(user=user3, friend=user4, status='pending')
    friend10 = Friend(user=user3, friend=user7, status='friends')

    friend11 = Friend(user=user4, friend=user5, status='friends')

    friend12 = Friend(user=user5, friend=user6, status='pending')

    friend13 = Friend(user=user6, friend=user7, status='friends')

    friend14 = Friend(user=user8, friend=user9, status='friends')
    friend15 = Friend(user=user8, friend=user10, status='pending')

    friend16 = Friend(user=user9, friend=user10, status='pending')

    friend17 = Friend(user=user4, friend=user1, status='pending')
    friend18 = Friend(user=user5, friend=user1, status='pending')
    friend19 = Friend(user=user7, friend=user1, status='pending')
    friend20 = Friend(user=user1, friend=user8, status='pending')
    friend21 = Friend(user=user1, friend=user9, status='pending')

    db.session.add(friend1)
    db.session.add(friend2)
    db.session.add(friend3)
    db.session.add(friend4)
    db.session.add(friend5)
    db.session.add(friend6)
    db.session.add(friend7)
    db.session.add(friend8)
    db.session.add(friend9)
    db.session.add(friend10)
    db.session.add(friend11)
    db.session.add(friend12)
    db.session.add(friend13)
    db.session.add(friend14)
    db.session.add(friend15)
    db.session.add(friend16)
    db.session.add(friend17)
    db.session.add(friend18)
    db.session.add(friend19)
    db.session.add(friend20)
    db.session.add(friend21)

    db.session.commit()

def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
