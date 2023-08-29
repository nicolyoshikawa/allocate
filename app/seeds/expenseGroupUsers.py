from app.models import db, ExpenseGroupUser, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

# Adds a demo user, you can add other users here if you want
def seed_group_users():
    user_group_1 = ExpenseGroupUser(
        user_id = 1,
        group_id = 1,
        paid_status = "paid"
    )

    user_group_2 = ExpenseGroupUser(
        user_id = 2,
        group_id = 1,
        paid_status = "unpaid"
    )

    user_group_3 = ExpenseGroupUser(
        user_id = 1,
        group_id = 2,
        paid_status = "unpaid"
    )

    user_group_4 = ExpenseGroupUser(
        user_id = 3,
        group_id = 2,
        paid_status = "paid"
    )

    user_group_5 = ExpenseGroupUser(
        user_id = 4,
        group_id = 3,
        paid_status = "paid"
    )

    user_group_6 = ExpenseGroupUser(
        user_id = 5,
        group_id = 3,
        paid_status = "unpaid"
    )

    user_group_7 = ExpenseGroupUser(
        user_id = 6,
        group_id = 4,
        paid_status = "paid"
    )

    user_group_8 = ExpenseGroupUser(
        user_id = 7,
        group_id = 4,
        paid_status = "unpaid"
    )

    user_group_9 = ExpenseGroupUser(
        user_id = 8,
        group_id = 5,
        paid_status = "paid"
    )

    user_group_10 = ExpenseGroupUser(
        user_id = 9,
        group_id = 5,
        paid_status = "unpaid"
    )

    user_group_11 = ExpenseGroupUser(
        user_id = 10,
        group_id = 6,
        paid_status = "paid"
    )

    user_group_12 = ExpenseGroupUser(
        user_id = 1,
        group_id = 6,
        paid_status = "unpaid"
    )

    user_group_13 = ExpenseGroupUser(
        user_id = 2,
        group_id = 7,
        paid_status = "paid"
    )

    user_group_14 = ExpenseGroupUser(
        user_id = 9,
        group_id = 7,
        paid_status = "unpaid"
    )
    user_group_15 = ExpenseGroupUser(
        user_id = 2,
        group_id = 8,
        paid_status = "unpaid"
    )
    user_group_16 = ExpenseGroupUser(
        user_id = 4,
        group_id = 8,
        paid_status = "unpaid"
    )
    user_group_17 = ExpenseGroupUser(
        user_id = 2,
        group_id = 9,
        paid_status = "unpaid"
    )
    user_group_18 = ExpenseGroupUser(
        user_id = 6,
        group_id = 9,
        paid_status = "unpaid"
    )
    user_group_19 = ExpenseGroupUser(
        user_id = 3,
        group_id = 10,
        paid_status = "unpaid"
    )
    user_group_20 = ExpenseGroupUser(
        user_id = 7,
        group_id = 10,
        paid_status = "unpaid"
    )

    db.session.add(user_group_1)
    db.session.add(user_group_2)
    db.session.add(user_group_3)
    db.session.add(user_group_4)
    db.session.add(user_group_5)
    db.session.add(user_group_6)
    db.session.add(user_group_7)
    db.session.add(user_group_8)
    db.session.add(user_group_9)
    db.session.add(user_group_10)
    db.session.add(user_group_11)
    db.session.add(user_group_12)
    db.session.add(user_group_13)
    db.session.add(user_group_14)
    db.session.add(user_group_15)
    db.session.add(user_group_16)
    db.session.add(user_group_17)
    db.session.add(user_group_18)
    db.session.add(user_group_19)
    db.session.add(user_group_20)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_group_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenseGroupUsers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expenseGroupUsers"))

    db.session.commit()
