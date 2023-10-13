from flask import Blueprint
from flask_login import current_user, login_required
from app.models import User, db, Expense, ExpenseGroupUser, ExpenseGroup, Comment, Friend
from flask_login import current_user

balance_routes = Blueprint('balances', __name__)

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

@balance_routes.route('/<int:friendId>/settle', methods=["PUT"])
@login_required
def settle_balance(friendId):
    userExpenses = Expense.query.join(ExpenseGroupUser, Expense.group_id == ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == current_user.id, Expense.settle_status == "unsettled").all()
    friendExpenses = Expense.query.join(ExpenseGroupUser, Expense.group_id == ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == friendId, Expense.settle_status == "unsettled").all()
    sharedExpenses = set(userExpenses).intersection(friendExpenses)

    for sharedExpense in sharedExpenses:
        sharedExpense.settle_status = "settled"
        db.session.commit()

    return { "message": ["Balance successfully settled"]}, 200
