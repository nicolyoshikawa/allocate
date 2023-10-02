from app.models import db, ExpenseGroup, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

# Adds a demo groups, you can add other users here if you want
def seed_groups():
    group1 = ExpenseGroup()
    group2 = ExpenseGroup()
    group3 = ExpenseGroup()
    group4 = ExpenseGroup()
    group5 = ExpenseGroup()
    group6 = ExpenseGroup()
    group7 = ExpenseGroup()
    group8 = ExpenseGroup()
    group9 = ExpenseGroup()
    group10 = ExpenseGroup()

    group11 = ExpenseGroup(
        name="House Expenses"
    )
    group12 = ExpenseGroup(
        name="Birthday"
    )
    group13 = ExpenseGroup(
        name="Work Trip"
    )

    db.session.add(group1)
    db.session.add(group2)
    db.session.add(group3)
    db.session.add(group4)
    db.session.add(group5)
    db.session.add(group6)
    db.session.add(group7)
    db.session.add(group8)
    db.session.add(group9)
    db.session.add(group10)

    db.session.add(group11)
    db.session.add(group12)
    db.session.add(group13)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenseGroups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expenseGroups"))

    db.session.commit()
