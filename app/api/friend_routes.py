from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Friend, db, User, ExpenseGroup, ExpenseGroupUser, Expense
from .expense_routes import add_group_user_dict_and_comments
from .balance import calculate_balance

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

    #returns array of dicts
    users_groups = ExpenseGroupUser.query.with_entities(ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == current_user.id).all()
    friends_groups = ExpenseGroupUser.query.with_entities(ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == targetId).all()
    user_friend_expense_groups= set(users_groups).intersection(friends_groups)
    group_ids = [id[0] for id in user_friend_expense_groups]

    db.session.delete(friendship)

    for group_id in group_ids:
        # expense = Expense.query.filter(Expense.group_id == group_id).all()
        # db.session.delete(expense)
        Expense.query.filter(Expense.group_id == group_id).delete()
        ExpenseGroupUser.query.filter(ExpenseGroupUser.group_id == group_id).delete()
        ExpenseGroup.query.filter(ExpenseGroup.id == group_id).delete()

    db.session.commit()

    return {"message": "Friend/friend request removed"}

@friend_routes.route("/<int:friendId>", methods=["GET"])
@login_required
def get_friend_exps(friendId):

    friendship = Friend.query.filter(
        (Friend.sender_id == current_user.id) & (Friend.receiver_id == friendId)  &
        (Friend.status == "friends")
        |
        (Friend.sender_id == friendId) & (Friend.receiver_id == current_user.id) &
        (Friend.status == "friends")
        ).first()

    # Check if the friendship exists
    if not friendship:
        return {'errors': ["Friend could not be found"]}, 404

    user_group_ids = ExpenseGroupUser.query.with_entities(ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == current_user.id).all()
    friend_group_ids = ExpenseGroupUser.query.with_entities(ExpenseGroupUser.group_id).filter(ExpenseGroupUser.user_id == friendId).all()
    user_friend_expense_groups= set(user_group_ids).intersection(friend_group_ids)
    user_friend_expense_group_id = [id[0] for id in user_friend_expense_groups]

    all_expenses = []
    # group_users_dict
    for group_id in user_friend_expense_group_id:
        expenses_per_group = Expense.query.filter(Expense.group_id == group_id, Expense.settle_status == "unsettled").all()
        all_expenses = expenses_per_group

        exp_group_users = ExpenseGroupUser.query.filter(group_id == ExpenseGroupUser.group_id).all()
        group_users_dict = []
        for exp_group_user in exp_group_users:
            user = User.query.get(exp_group_user.user_id)
            user_dict = user.to_dict()
            group_users_dict.append(user_dict)

    expense_list = []
    for expense in all_expenses:
        exp_dict = add_group_user_dict_and_comments(expense)
        expense_list.append(exp_dict)

    balance = calculate_balance(user_friend_expense_group_id)
    return {"expenses": expense_list, "balance": balance, "users": group_users_dict, "friend_status": friendship.to_dict()}
