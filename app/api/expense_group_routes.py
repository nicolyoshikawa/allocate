from flask import Blueprint, jsonify, session, request
from app.models import User, db, Expense, ExpenseGroupUser, ExpenseGroup, Comment
from app.forms import ExpenseForm, CommentForm
from flask_login import current_user, login_required
from app.api.aws_util import (
    upload_file_to_s3, get_unique_filename)
from .auth_routes import validation_errors_to_error_messages
from datetime import date

expense_group_routes = Blueprint('groups', __name__)

def add_group_user_dict_and_comments(exp):
    exp_group_users = ExpenseGroupUser.query.filter(exp.group_id == ExpenseGroupUser.group_id).all()
    exp_comments = Comment.query.filter(exp.id == Comment.expense_id).all()
    exp_dict = exp.to_dict()
    group_user_list = []
    for exp_group_user in exp_group_users:
        user = User.query.get(exp_group_user.user_id)
        user_dict = user.to_dict()
        group_user_list.append(user_dict)

    comments_list = []
    for comment in exp_comments:
        comment_dict = comment.to_dict()
        comments_list.append(comment_dict)

    exp_dict["expense_group_users"] = group_user_list
    exp_dict["comments"] = comments_list
    return exp_dict

def add_group(exp):
    expense_group = ExpenseGroup.query.filter(exp.group_id == ExpenseGroup.id).all()
    exp_dict = exp.to_dict()

    groups_list = []
    for group in expense_group:
        group_dict = group.to_dict()
        groups_list.append(group_dict)

    exp_dict["group"] = groups_list
    return exp_dict

@expense_group_routes.route('/', methods=["GET"])
@login_required
def get_all_expenses():
    all_expenses = Expense.query.join(ExpenseGroupUser, Expense.group_id == ExpenseGroupUser.group_id).join(ExpenseGroup, ExpenseGroup.id == ExpenseGroupUser.group_id).filter(ExpenseGroup.name != "NULL").all()
    expense_list = []
    for expense in all_expenses:
        exp_dict = add_group_user_dict_and_comments(expense)
        group_dict = add_group(expense)
        expense_list.append(exp_dict)
        expense_list.append(group_dict)
    return {"expenses": expense_list}
