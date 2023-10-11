from app.models import db, environment, SCHEMA, Expense
from sqlalchemy.sql import text
from datetime import date

def seed_expenses():
    bill1 = Expense(
        group_id = 1,
        paid_by = 1,
        description = "dog food",
        settle_status= "unsettled",
        price = 10.0,
        expense_date = date(2023, 8, 1),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill2 = Expense(
        group_id = 1,
        paid_by = 1,
        description = "dog toy",
        settle_status= "unsettled",
        price = 5.0,
        expense_date = date(2023, 8, 1),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill3 = Expense(
        group_id = 2,
        paid_by = 3,
        description = "cat food",
        settle_status= "unsettled",
        price = 10.0,
        expense_date = date(2023, 2, 5),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill4 = Expense(
        group_id = 2,
        paid_by = 3,
        description = "cat toy",
        settle_status= "unsettled",
        price = 20.0,
        expense_date = date(2023, 3, 9),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill5 = Expense(
        group_id = 3,
        paid_by = 4,
        description = "toilet paper",
        settle_status= "unsettled",
        price = 15.0,
        expense_date = date(2023, 7, 2),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill6 = Expense(
        group_id = 3,
        paid_by = 4,
        description = "paper towels",
        settle_status= "unsettled",
        price = 20.0,
        expense_date = date(2023, 7, 2),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill7 = Expense(
        group_id = 4,
        paid_by = 6,
        description = "groceries",
        settle_status= "unsettled",
        price = 100.0,
        expense_date = date(2023, 3, 5),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill8 = Expense(
        group_id = 4,
        paid_by = 6,
        description = "take-out",
        settle_status= "unsettled",
        price = 30.5,
        expense_date = date(2023, 8, 10),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill9 = Expense(
        group_id = 5,
        paid_by = 8,
        description = "wine",
        settle_status= "unsettled",
        price = 40.0,
        expense_date = date(2023, 11, 7),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill10 = Expense(
        group_id = 5,
        paid_by = 8,
        description = "beer",
        settle_status= "unsettled",
        price = 6.80,
        expense_date = date(2023, 2, 5),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill11 = Expense(
        group_id = 6,
        paid_by = 10,
        description = "rent",
        settle_status= "unsettled",
        price = 1820.0,
        expense_date = date(2023, 7, 9),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill12 = Expense(
        group_id = 6,
        paid_by = 10,
        description = "utilities",
        settle_status= "unsettled",
        price = 75.0,
        expense_date = date(2023, 10, 11),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill13 = Expense(
        group_id = 7,
        paid_by = 2,
        description = "uber",
        settle_status= "unsettled",
        price = 22.0,
        expense_date = date(2023, 12, 12),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill14 = Expense(
        group_id = 7,
        paid_by = 2,
        description = "dinner",
        settle_status= "unsettled",
        price = 70.0,
        expense_date = date(2023, 12, 12),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill15 = Expense(
        group_id = 7,
        paid_by = 2,
        description = "flowers",
        settle_status= "unsettled",
        price = 44.5,
        expense_date = date(2023, 12, 12),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )

    bill16 = Expense(
        group_id = 1,
        paid_by = 2,
        description = "donuts",
        settle_status= "unsettled",
        price = 21.06,
        expense_date = date(2023, 8, 11),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill21 = Expense(
        group_id = 1,
        paid_by = 1,
        description = "uber",
        settle_status= "unsettled",
        price = 15.72,
        expense_date = date(2023, 8, 1),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill31 = Expense(
        group_id = 2,
        paid_by = 3,
        description = "dog food",
        settle_status= "unsettled",
        price = 10.03,
        expense_date = date(2023, 2, 5),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill41 = Expense(
        group_id = 2,
        paid_by = 1,
        description = "dog toy",
        settle_status= "unsettled",
        price = 20.40,
        expense_date = date(2023, 3, 9),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill51 = Expense(
        group_id = 3,
        paid_by = 4,
        description = "uber",
        settle_status= "unsettled",
        price = 15.0,
        expense_date = date(2023, 7, 2),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill61 = Expense(
        group_id = 3,
        paid_by = 5,
        description = "lyft",
        settle_status= "unsettled",
        price = 20.07,
        expense_date = date(2023, 7, 2),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill71 = Expense(
        group_id = 1,
        paid_by = 1,
        description = "groceries",
        settle_status= "unsettled",
        price = 100.0,
        expense_date = date(2023, 3, 5),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill81 = Expense(
        group_id = 2,
        paid_by = 1,
        description = "take-out",
        settle_status= "unsettled",
        price = 30.5,
        expense_date = date(2023, 8, 10),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill91 = Expense(
        group_id = 3,
        paid_by = 1,
        description = "wine",
        settle_status= "unsettled",
        price = 40.0,
        expense_date = date(2023, 11, 7),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill101 = Expense(
        group_id = 1,
        paid_by = 1,
        description = "beer",
        settle_status= "unsettled",
        price = 6.80,
        expense_date = date(2023, 2, 5),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill111 = Expense(
        group_id = 2,
        paid_by = 3,
        description = "rent",
        settle_status= "unsettled",
        price = 1820.0,
        expense_date = date(2023, 7, 9),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill121 = Expense(
        group_id = 3,
        paid_by = 4,
        description = "utilities",
        settle_status= "unsettled",
        price = 75.0,
        expense_date = date(2023, 10, 11),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill131 = Expense(
        group_id = 3,
        paid_by = 4,
        description = "uber",
        settle_status= "unsettled",
        price = 22.0,
        expense_date = date(2023, 12, 12),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill141 = Expense(
        group_id = 1,
        paid_by = 2,
        description = "dinner",
        settle_status= "unsettled",
        price = 70.0,
        expense_date = date(2023, 12, 12),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill151 = Expense(
        group_id = 1,
        paid_by = 2,
        description = "flowers",
        settle_status= "unsettled",
        price = 44.5,
        expense_date = date(2023, 12, 12),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )

    bill17 = Expense(
        group_id = 11,
        paid_by = 1,
        description = "paper towels",
        settle_status= "unsettled",
        price = 16.99,
        expense_date = date(2023, 7, 2),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill18 = Expense(
        group_id = 11,
        paid_by = 1,
        description = "coffee",
        settle_status= "unsettled",
        price = 15.0,
        expense_date = date(2023, 7, 2),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill19 = Expense(
        group_id = 11,
        paid_by = 2,
        description = "laundry detergent",
        settle_status= "unsettled",
        price = 21.49,
        expense_date = date(2023, 9, 2),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill20 = Expense(
        group_id = 11,
        paid_by = 2,
        description = "hand soap",
        settle_status= "unsettled",
        price = 27.93,
        expense_date = date(2023, 9, 2),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )

    bill22 = Expense(
        group_id = 12,
        paid_by = 1,
        description = "cupcakes",
        settle_status= "unsettled",
        price = 50.93,
        expense_date = date(2023, 5, 11),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill23 = Expense(
        group_id = 12,
        paid_by = 1,
        description = "candles",
        settle_status= "unsettled",
        price = 2.19,
        expense_date = date(2023, 5, 11),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill24 = Expense(
        group_id = 12,
        paid_by = 3,
        description = "decoration",
        settle_status= "unsettled",
        price = 32.93,
        expense_date = date(2023, 5, 11),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill25 = Expense(
        group_id = 12,
        paid_by = 3,
        description = "drinks",
        settle_status= "unsettled",
        price = 27.99,
        expense_date = date(2023, 5, 11),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )

    bill26 = Expense(
        group_id = 13,
        paid_by = 1,
        description = "Uber",
        settle_status= "unsettled",
        price = 23.56,
        expense_date = date(2023, 8, 9),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill27 = Expense(
        group_id = 13,
        paid_by = 1,
        description = "coffee",
        settle_status= "unsettled",
        price = 15.99,
        expense_date = date(2023, 8, 9),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill28 = Expense(
        group_id = 13,
        paid_by = 1,
        description = "snacks",
        settle_status= "unsettled",
        price = 25.99,
        expense_date = date(2023, 8, 9),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill29 = Expense(
        group_id = 13,
        paid_by = 1,
        description = "coffee",
        settle_status= "unsettled",
        price = 15.99,
        expense_date = date(2023, 8, 10),
        receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"
    )
    bill30 = Expense(
        group_id = 13,
        paid_by = 1,
        description = "flight",
        settle_status= "unsettled",
        price = 855.89,
        expense_date = date(2023, 8, 8),
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

    db.session.add(bill17)
    db.session.add(bill18)
    db.session.add(bill19)
    db.session.add(bill20)

    db.session.add(bill22)
    db.session.add(bill23)
    db.session.add(bill24)
    db.session.add(bill25)

    db.session.add(bill26)
    db.session.add(bill27)
    db.session.add(bill28)
    db.session.add(bill29)
    db.session.add(bill30)

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
