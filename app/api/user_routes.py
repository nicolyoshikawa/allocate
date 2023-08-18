from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Friend

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
    A logged in user can view pending friend request to accept/reject and existing friends.
    """
    receiver_list = Friend.query.filter(Friend.receiver_id == current_user.id).all()
    sender_list = Friend.query.filter(Friend.sender_id == current_user.id).all()

    friends_info = []
    for friend_request in receiver_list:
            userDict = friend_request.user.to_dict()
            userDict["status"] = friend_request.status
            friends_info.append(userDict)
    for friend_request in sender_list:
            userDict = friend_request.friend.to_dict()
            userDict["status"] = friend_request.status
            friends_info.append(userDict)

    return jsonify(friends_info)
