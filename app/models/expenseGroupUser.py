from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class ExpenseGroupUser(db.Model):
    __tablename__ = 'expenseGroupUsers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('expenseGroups.id')), nullable=False)
    paid_status = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    user = db.relationship('User', back_populates='expense_group_user')
    expense_group = db.relationship('ExpenseGroup', back_populates='expense_group_users')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'group_id': self.group_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
