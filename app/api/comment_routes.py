from flask import Blueprint, jsonify, session, request
from app.models import User, db, Comment
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

def add_User_obj(comment):
    user = User.query.filter(comment.user_id == User.id).first()
    commentOwner = user.to_dict()
    commentDict = comment.to_dict()
    commentDict["User"] = commentOwner
    return commentDict

@comment_routes.route('/<int:id>', methods=["GET"])
@login_required
def get_a_specific_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return {'errors': "Comment could not be found"}, 404

    commentDict = add_User_obj(comment)
    return commentDict

@comment_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return {'errors': "Comment could not be found"}, 404

    if current_user.id == comment.user_id:
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            comment.message = form.data["message"]

            db.session.commit()

            commentDict = add_User_obj(comment)
            return commentDict
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Unauthorized']}

@comment_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return {'errors': "Comment could not be found"}, 404

    if current_user.id == comment.user_id:
        db.session.delete(comment)
        db.session.commit()
        return { "message": "Comment successfully deleted"}, 200
    return {'errors': ['Unauthorized']}

@comment_routes.route("/", methods=["GET"])
@login_required
def get_comment():
    comments = Comment.query.all()
    commentsList = []
    for comment in comments:
        commentDict = add_User_obj(comment)
        commentsList.append(commentDict)
    return {"comments": commentsList}
