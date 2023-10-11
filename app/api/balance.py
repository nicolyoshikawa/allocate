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

@balance_routes.route('/<int:friendId>', methods=["PUT"])
@login_required
def settle_balance(friendId):
    pass
    # user = User.query.filter_by(id = friendId).first()
    # if not user:
    #     return {'errors': ["Friend could not be found"]}, 404

    # user_dict = user.to_dict()
    # targetId = user_dict["id"]
    # expense = Expense.query.get(id)
    # if not expense:
    #     return {'errors': ["Expense could not be found"]}, 404

    # expense_group_user = ExpenseGroupUser.query.filter(ExpenseGroupUser.group_id == expense.group_id, ExpenseGroupUser.user_id == current_user.id).first()
    # if not expense_group_user:
    #     return {'errors': ['Unauthorized']}

    # db.session.delete(expense)
    # db.session.commit()
    # return { "message": ["Expense successfully deleted"]}, 200
