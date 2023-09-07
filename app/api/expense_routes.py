from flask import Blueprint, jsonify, session, request
from app.models import User, db, Expense, ExpenseGroupUser, ExpenseGroup
from app.forms import ExpenseForm
from flask_login import current_user, login_required
from app.api.aws_util import (
    upload_file_to_s3, get_unique_filename)
from .auth_routes import validation_errors_to_error_messages
from datetime import date

expense_routes = Blueprint('expenses', __name__)

def add_group_user_dict(exp):
    exp_group_users = ExpenseGroupUser.query.filter(exp.group_id == ExpenseGroupUser.group_id).all()
    exp_dict = exp.to_dict()
    group_user_list = []
    for exp_group_user in exp_group_users:
        user = User.query.get(exp_group_user.user_id)
        user_dict = user.to_dict()
        group_user_list.append(user_dict)

    exp_dict["expense_group_users"] = group_user_list
    return exp_dict

# def add_balance_dict(exp):
#     # exp_group_users = ExpenseGroupUser.query.filter(exp.group_id == ExpenseGroupUser.group_id).all()
#     balance_dict = {}
#     paid_amount = exp.price
#     if exp.paid_by == current_user.id:
#         friend_owes = (paid_amount/2)
#     if exp.paid_by != current_user.id:
#         friend_owes = (paid_amount/2)
#     # group_user_list = []
#     # for exp_group_user in exp_group_users:
#     #     user = User.query.get(exp_group_user.user_id)
#     #     user_dict = user.to_dict()
#     #     group_user_list.append(user_dict)

#     balance_dict["friend_owes"] = friend_owes
#     return balance_dict

@expense_routes.route('/<int:id>', methods=["GET"])
@login_required
def get_a_specific_expense(id):
    expense_exists = Expense.query.get(id)
    if not expense_exists:
        return {'errors': ["Expense could not be found"]}, 404

    expense = Expense.query.join(ExpenseGroupUser, Expense.group_id == ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == current_user.id, Expense.id == id).first()
    if not expense:
        return {'errors': ["You do not have access to this expense"]}, 403

    exp_dict = add_group_user_dict(expense)
    return exp_dict

@expense_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_an_expense(id):
    expense = Expense.query.get(id)
    if not expense:
        return {'errors': ["Expense could not be found"]}, 404

    owner = expense.paid_by
    if current_user.id == owner:
        form = ExpenseForm()

        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

            friend_id = form.data["friend_id"]
            if friend_id == current_user.id:
                return {'errors': ["You cannot create an expense to split with yourself"]}, 403

            receipt_img_url = form.data["receipt_img_url"]
            if not receipt_img_url:
                receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"

            expense_date = form.data["expense_date"]
            if not expense_date:
                expense_date = date.today()

            if not form.data["group_id"]:
                users_groups = ExpenseGroupUser.query.with_entities(ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == current_user.id).all()
                friends_groups = ExpenseGroupUser.query.with_entities(ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == friend_id).all()
                user_friend_expense_groups= set(users_groups).intersection(friends_groups)
                user_friend_expense_group_id = [id[0] for id in user_friend_expense_groups]
                if not user_friend_expense_group_id:
                    return {'errors': ["You do not have a group with this friend"]}, 403

                group_id = user_friend_expense_group_id[0]
            else:
                group_id = form.data["group_id"]
                expense_group_exists = ExpenseGroup.query.filter(ExpenseGroup.id == group_id).all()
                if not expense_group_exists:
                    return {'errors': ["Group does not exist"]}, 404
                users_group = ExpenseGroupUser.query.filter(ExpenseGroupUser.user_id == current_user.id, ExpenseGroupUser.group_id == group_id).all()
                friends_group = ExpenseGroupUser.query.filter(ExpenseGroupUser.user_id == friend_id, ExpenseGroupUser.group_id == group_id).all()
                if not users_group or not friends_group:
                    return {'errors': ["You or your friend are not part of this group"]}, 403

            expense.group_id = group_id
            expense.expense_date = expense_date
            expense.description = form.data["description"]
            expense.price = form.data["price"]
            expense.receipt_img_url = receipt_img_url
            db.session.commit()
            return expense.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Unauthorized']}

@expense_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_an_expense(id):
    expense = Expense.query.get(id)
    if not expense:
        return {'errors': ["Expense could not be found"]}, 404

    expense_group_user = ExpenseGroupUser.query.filter(ExpenseGroupUser.group_id == expense.group_id, ExpenseGroupUser.user_id == current_user.id).first()
    if not expense_group_user:
        return {'errors': ['Unauthorized']}

    db.session.delete(expense)
    db.session.commit()
    return { "message": ["Expense successfully deleted"]}, 200


@expense_routes.route('/', methods=["GET"])
@login_required
def get_all_expenses():
    all_expenses = Expense.query.join(ExpenseGroupUser, Expense.group_id == ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == current_user.id).all()
    expense_list = []
    for expense in all_expenses:
        exp_dict = add_group_user_dict(expense)
        # exp_dict["balance"] = add_balance_dict(expense)
        expense_list.append(exp_dict)
    return {"expenses": expense_list}

@expense_routes.route('/', methods=["POST"])
@login_required
def add_an_expense():
    form = ExpenseForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        receipt_img_url = form.data["receipt_img_url"]
        receipt_img_url.filename = get_unique_filename(receipt_img_url.filename)
        upload = upload_file_to_s3(receipt_img_url)
        print(upload)
        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message (and we printed it above)
            # return render_template("post_form.html", form=form, errors=[upload])
            return {'errors': [upload]}, 401

        url = upload["url"]
        receipt_image = url
        # if not receipt_img_url:
        #     receipt_img_url = "https://t4.ftcdn.net/jpg/03/54/86/65/360_F_354866517_R3UOtdkGJrXAZ0e7tMuFM9HmJmL7Smfk.jpg"

        expense_date = form.data["expense_date"]
        if not expense_date:
            expense_date = date.today()

        friend_id = form.data["friend_id"]
        if friend_id == current_user.id:
            return {'errors': ["You cannot create an expense to split with yourself"]}, 403

        if not form.data["group_id"]:
            users_groups = ExpenseGroupUser.query.with_entities(ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == current_user.id).all()
            friends_groups = ExpenseGroupUser.query.with_entities(ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == friend_id).all()
            user_friend_expense_groups= set(users_groups).intersection(friends_groups)
            user_friend_expense_group_id = [id[0] for id in user_friend_expense_groups]
            if not user_friend_expense_group_id:
                return {'errors': ["You do not have a group with this friend"]}, 403

            group_id = user_friend_expense_group_id[0]
        else:
            group_id = form.data["group_id"]
            expense_group_exists = ExpenseGroup.query.filter(ExpenseGroup.id == group_id).all()
            if not expense_group_exists:
                return {'errors': ["Group does not exist"]}, 404
            users_group = ExpenseGroupUser.query.filter(ExpenseGroupUser.user_id == current_user.id, ExpenseGroupUser.group_id == group_id).all()
            friends_group = ExpenseGroupUser.query.filter(ExpenseGroupUser.user_id == friend_id, ExpenseGroupUser.group_id == group_id).all()
            if not users_group or not friends_group:
                return {'errors': ["You or your friend are not part of this group"]}, 403

        new_expense = Expense(
            group_id=group_id,
            paid_by=current_user.id,
            description=form.data["description"],
            price=form.data["price"],
            receipt_img_url=receipt_image,
            expense_date=expense_date
        )

        db.session.add(new_expense)
        db.session.commit()
        return new_expense.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
