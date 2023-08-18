from flask import Blueprint, jsonify, session, request
from app.models import User, db, Expense, ExpenseGroupUser
from flask_login import current_user, login_required

expense_routes = Blueprint('expenses', __name__)

def add_group_user_dict(exp):
    exp_group_users = ExpenseGroupUser.query.filter(exp.group_id == ExpenseGroupUser.group_id).all()

    user_list = []
    for exp_group_user in exp_group_users:
        user = User.query.get(exp_group_user.user_id)
        user_dict = user.to_dict()
        user_list.append(user_dict)

    exp_dict = exp.to_dict()
    exp_dict["expense_group_users"] = user_list
    return exp_dict

@expense_routes.route('/<int:id>', methods=["GET"])
@login_required
def get_a_specific_expense(id):
    expense = Expense.query.get(id)
    exp_dict = add_group_user_dict(expense)
    return {"expenses": exp_dict}

@expense_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_an_expense():
    pass

@expense_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_an_expense():
    pass

@expense_routes.route('/', methods=["GET"])
@login_required
def get_all_expenses():
    all_expenses = Expense.query.all()
    expense_list = []
    for expense in all_expenses:
        exp_dict = add_group_user_dict(expense)
        expense_list.append(exp_dict)
    return {"expenses": expense_list}

@expense_routes.route('/', methods=["POST"])
@login_required
def add_an_expense():
    pass
