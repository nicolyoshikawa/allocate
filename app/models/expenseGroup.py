from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class ExpenseGroup(db.Model):
    __tablename__ = 'expenseGroups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    expenses = db.relationship('Expense', back_populates='expense_groups')
    expense_group_users = db.relationship('ExpenseGroupUser', back_populates='expense_group')

    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
