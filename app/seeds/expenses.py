from app.models import db, environment, SCHEMA, Expense
from sqlalchemy.sql import text
from datetime import date

def seed_expenses():
    bill1 = Expense(
        group_id = 1,
        paid_by = 1,
        description = "dog food",
        price = 10.0,
        expense_date = date(2023, 8, 1),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill2 = Expense(
        group_id = 1,
        paid_by = 1,
        description = "dog toy",
        price = 5.0,
        expense_date = date(2023, 8, 1),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill3 = Expense(
        group_id = 2,
        paid_by = 3,
        description = "cat food",
        price = 10.0,
        expense_date = date(2023, 2, 5),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill4 = Expense(
        group_id = 2,
        paid_by = 3,
        description = "cat toy",
        price = 20.0,
        expense_date = date(2023, 3, 9),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill5 = Expense(
        group_id = 3,
        paid_by = 4,
        description = "toilet paper",
        price = 15.0,
        expense_date = date(2023, 7, 2),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill6 = Expense(
        group_id = 3,
        paid_by = 4,
        description = "paper towels",
        price = 20.0,
        expense_date = date(2023, 7, 2),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill7 = Expense(
        group_id = 4,
        paid_by = 6,
        description = "groceries",
        price = 100.0,
        expense_date = date(2023, 3, 5),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill8 = Expense(
        group_id = 4,
        paid_by = 6,
        description = "take-out",
        price = 30.5,
        expense_date = date(2023, 8, 10),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill9 = Expense(
        group_id = 5,
        paid_by = 8,
        description = "wine",
        price = 40.0,
        expense_date = date(2023, 11, 7),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill10 = Expense(
        group_id = 5,
        paid_by = 8,
        description = "beer",
        price = 6.80,
        expense_date = date(2023, 2, 5),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill11 = Expense(
        group_id = 6,
        paid_by = 10,
        description = "rent",
        price = 1820.0,
        expense_date = date(2023, 7, 9),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill12 = Expense(
        group_id = 6,
        paid_by = 10,
        description = "utilities",
        price = 75.0,
        expense_date = date(2023, 10, 11),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill13 = Expense(
        group_id = 7,
        paid_by = 2,
        description = "uber",
        price = 22.0,
        expense_date = date(2023, 12, 12),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill14 = Expense(
        group_id = 7,
        paid_by = 2,
        description = "dinner",
        price = 70.0,
        expense_date = date(2023, 12, 12),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill15 = Expense(
        group_id = 7,
        paid_by = 2,
        description = "flowers",
        price = 44.5,
        expense_date = date(2023, 12, 12),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )

    bill16 = Expense(
        group_id = 1,
        paid_by = 2,
        description = "donuts",
        price = 21.06,
        expense_date = date(2023, 8, 11),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill21 = Expense(
        group_id = 1,
        paid_by = 1,
        description = "uber",
        price = 15.72,
        expense_date = date(2023, 8, 1),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill31 = Expense(
        group_id = 2,
        paid_by = 3,
        description = "dog food",
        price = 10.03,
        expense_date = date(2023, 2, 5),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill41 = Expense(
        group_id = 2,
        paid_by = 1,
        description = "dog toy",
        price = 20.40,
        expense_date = date(2023, 3, 9),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill51 = Expense(
        group_id = 3,
        paid_by = 4,
        description = "uber",
        price = 15.0,
        expense_date = date(2023, 7, 2),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill61 = Expense(
        group_id = 3,
        paid_by = 5,
        description = "lyft",
        price = 20.07,
        expense_date = date(2023, 7, 2),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill71 = Expense(
        group_id = 1,
        paid_by = 1,
        description = "groceries",
        price = 100.0,
        expense_date = date(2023, 3, 5),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill81 = Expense(
        group_id = 2,
        paid_by = 1,
        description = "take-out",
        price = 30.5,
        expense_date = date(2023, 8, 10),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill91 = Expense(
        group_id = 3,
        paid_by = 1,
        description = "wine",
        price = 40.0,
        expense_date = date(2023, 11, 7),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill101 = Expense(
        group_id = 1,
        paid_by = 1,
        description = "beer",
        price = 6.80,
        expense_date = date(2023, 2, 5),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill111 = Expense(
        group_id = 2,
        paid_by = 3,
        description = "rent",
        price = 1820.0,
        expense_date = date(2023, 7, 9),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill121 = Expense(
        group_id = 3,
        paid_by = 4,
        description = "utilities",
        price = 75.0,
        expense_date = date(2023, 10, 11),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill131 = Expense(
        group_id = 3,
        paid_by = 4,
        description = "uber",
        price = 22.0,
        expense_date = date(2023, 12, 12),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill141 = Expense(
        group_id = 1,
        paid_by = 2,
        description = "dinner",
        price = 70.0,
        expense_date = date(2023, 12, 12),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill151 = Expense(
        group_id = 1,
        paid_by = 2,
        description = "flowers",
        price = 44.5,
        expense_date = date(2023, 12, 12),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )

    db.session.add(bill1)
    db.session.add(bill2)
    db.session.add(bill3)
    db.session.add(bill4)
    db.session.add(bill5)
    db.session.add(bill6)
    db.session.add(bill7)
    db.session.add(bill8)
    db.session.add(bill9)
    db.session.add(bill10)
    db.session.add(bill11)
    db.session.add(bill12)
    db.session.add(bill13)
    db.session.add(bill14)
    db.session.add(bill15)
    db.session.add(bill16)
    db.session.add(bill21)
    db.session.add(bill31)
    db.session.add(bill41)
    db.session.add(bill51)
    db.session.add(bill61)
    db.session.add(bill71)
    db.session.add(bill81)
    db.session.add(bill91)
    db.session.add(bill101)
    db.session.add(bill111)
    db.session.add(bill121)
    db.session.add(bill131)
    db.session.add(bill141)
    db.session.add(bill151)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expenses"))

    db.session.commit()
