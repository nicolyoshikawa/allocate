from app.models import db, environment, SCHEMA, User, Friend, Comment
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
        user_id=2,
        expense_id=1,
        message="let's split this!",
    )
    comment2 = Comment(
        user_id=3,
        expense_id=3,
        message="let's split this!",
    )
    comment3 = Comment(
        user_id=4,
        expense_id=5,
        message="let's split this!",
    )
    comment4 = Comment(
        user_id=6,
        expense_id=7,
        message="let's split this!",
    )
    comment5 = Comment(
        user_id=8,
        expense_id=9,
        message="let's split this!",
    )
    comment6 = Comment(
        user_id=10,
        expense_id=11,
        message="let's split this!",
    )
    comment7 = Comment(
        user_id=2,
        expense_id=13,
        message="let's split this!",
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
