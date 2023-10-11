from app.models import User, db, Expense, ExpenseGroupUser, ExpenseGroup, Comment
from flask_login import current_user

def calculate_balance(group_id_list):
    balance = 0
    total = 0

    for group_id in group_id_list:
        all_expenses_in_group_list = Expense.query.filter(Expense.group_id == group_id).all()

        for exp in all_expenses_in_group_list:
            if exp.paid_by == current_user.id:
                total += exp.price
            else:
                total -= exp.price

    balance = total / 2
    return balance
