from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

expense_routes = Blueprint('expenses', __name__)

@expense_routes.route('/', methods=["GET"])
@login_required
def authenticate():
    pass
