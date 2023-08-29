from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Friend, db, User, ExpenseGroup, ExpenseGroupUser

friend_routes = Blueprint("friends", __name__)

@friend_routes.route("/request/<targetEmail>", methods=["POST"])
@login_required
def add_friend(targetEmail):
    """
    A logged-in user can add a friend.
    """
    user = User.query.filter_by(email = targetEmail).first()
    if not user:
        return {'errors': ["Friend could not be found"]}, 404

    user_dict = user.to_dict()
    targetId = user_dict["id"]

    if current_user.id == targetId:
        return {'errors': ["Cannot add yourself as a friend"]}, 400

    target_user = User.query.get(targetId)
    if not target_user:
        return {'errors': ["Friend could not be found"]}, 404

    request_exists = Friend.query.filter_by(receiver_id=targetId,
                                     sender_id=current_user.id).first()
    request_exists_otherway = Friend.query.filter_by(sender_id=targetId,
                                     receiver_id=current_user.id).first()
    if request_exists or request_exists_otherway:
        return {'errors': ["Friend request already exists/already friends"]}, 400

    new_request = Friend(
        user=current_user,
        friend=target_user,
        status="pending"
    )
    db.session.add(new_request)
    db.session.commit()
    return {"message": "Friend request sent"}

@friend_routes.route("/accept/<int:targetId>", methods=["PUT"])
@login_required
def accept_friend(targetId):
    """
    A logged-in user can accept a friend request.
    """
    request = Friend.query.filter_by(sender_id=targetId,
                                     receiver_id=current_user.id,
                                     status="pending").first()

    # Check if the friendship request exists
    if not request:
        return {'errors': ["Friend request could not be found"]}, 404

    new_group = ExpenseGroup()
    db.session.add(new_group)
    db.session.commit()

    add_friend_to_group = ExpenseGroupUser(
        user_id = current_user.id,
        group_id = new_group.id,
        paid_status = "unpaid"
    )
    add_user_to_group = ExpenseGroupUser(
        user_id = targetId,
        group_id = new_group.id,
        paid_status = "unpaid"
    )

    request.status = "friends"

    db.session.add(add_friend_to_group)
    db.session.add(add_user_to_group)
    db.session.commit()
    return {"message": "Request accepted"}

# @friend_routes.route("/reject/<int:targetId>", methods=["DELETE"])
# @login_required
# def reject_friend(targetId):
#     """
#     A logged-in user can reject a friend request.
#     """
#     request = Friend.query.filter_by(sender_id=targetId,
#                                      receiver_id=current_user.id,
#                                      status="pending").first()

#     # Check if the friendship request exists
#     if not request:
#         return {'errors': ["Friend request could not be found"]}, 404

#     db.session.delete(request)
#     db.session.commit()
#     return {"message": "Request rejected"}

@friend_routes.route("/remove/<int:targetId>", methods=["DELETE"])
@login_required
def delete_friend(targetId):
    """
    A logged-in user can delete a friend.
    """
    friendship = Friend.query.filter(
        (Friend.sender_id == current_user.id) & (Friend.receiver_id == targetId) |
        (Friend.sender_id == targetId) & (Friend.receiver_id == current_user.id)
    ).first()

    # Check if the friendship exists
    if not friendship:
        return {'errors': ["Friend could not be found"]}, 404

    # users_groups = ExpenseGroupUser.query.filter(ExpenseGroupUser.user_id == targetId).all()
    # friends_groups = ExpenseGroupUser.query.filter(ExpenseGroupUser.user_id == current_user.id).all()
    # user_friend_expense_groups= set(users_groups).intersection(friends_groups)

    # print("------ users_groups ------", users_groups)
    # print("------ friends_groups ------", friends_groups)
    # print("------ user_friend_expense_groups ------", user_friend_expense_groups)
    # db.session.delete(user_friend_expense_groups)
    db.session.delete(friendship)
    db.session.commit()
    return {"message": "Friend/friend request removed"}
