from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Friend, ExpenseGroupUser
from .balance import calculate_balance

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route("/friends", methods=["GET"])
@login_required
def get_current_user_friend_list():
    """
    A logged in user can view pending friend requests and existing friends.
    """
    receiver_list = Friend.query.filter(Friend.receiver_id == current_user.id).all()
    sender_list = Friend.query.filter(Friend.sender_id == current_user.id).all()
    # expense = Friend.query.join(ExpenseGroupUser, Friend.sender_id == current_user.id).filter(ExpenseGroupUser.user_id == current_user.id).all()

    friends_info = []
    for friend_request in receiver_list:
            userDict = friend_request.user.to_dict()

            users_groups = ExpenseGroupUser.query.with_entities(ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == current_user.id).all()
            friends_groups = ExpenseGroupUser.query.with_entities(ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == friend_request.user.id).all()
            user_friend_expense_groups= set(users_groups).intersection(friends_groups)
            group_id_list = [id[0] for id in user_friend_expense_groups]

            userDict["friend"] = friend_request.to_dict()
            userDict["group_id"] = group_id_list
            balance = calculate_balance(group_id_list)
            userDict["balance"] = balance
            friends_info.append(userDict)
    for friend_request in sender_list:
            userDict = friend_request.friend.to_dict()

            users_groups = ExpenseGroupUser.query.with_entities(ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == current_user.id).all()
            friends_groups = ExpenseGroupUser.query.with_entities(ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == friend_request.friend.id).all()
            user_friend_expense_groups= set(users_groups).intersection(friends_groups)
            group_id_list = [id[0] for id in user_friend_expense_groups]

            userDict["friend"] = friend_request.to_dict()
            userDict["group_id"] = group_id_list
            balance = calculate_balance(group_id_list)
            userDict["balance"] = balance
            friends_info.append(userDict)

    return jsonify(friends_info)
