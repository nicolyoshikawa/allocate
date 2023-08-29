from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Expense(db.Model):
    __tablename__ = 'expenses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('expenseGroups.id')), nullable=False)
    paid_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float(), nullable=False)
    receipt_img_url = db.Column(db.String(500))
    expense_date = db.Column(db.Date())
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    expense_paid_by = db.relationship('User', back_populates='user_paid_expense')
    expense_groups = db.relationship('ExpenseGroup', back_populates='expenses')
    expense_comments = db.relationship('Comment', back_populates='expense', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'group_id': self.group_id,
            'paid_by': self.paid_by,
            'description': self.description,
            'price': self.price,
            'expense_date': self.expense_date.isoformat(),
            'receipt_img_url': self.receipt_img_url,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
