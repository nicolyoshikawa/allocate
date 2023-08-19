from .db import db, environment, SCHEMA, add_prefix_for_prod


class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    receiver_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    status = db.Column(db.String(20), nullable=False, default='pending')

    user = db.relationship('User', foreign_keys=[sender_id], back_populates='friends')
    friend = db.relationship('User', foreign_keys=[receiver_id], back_populates='friend_of')

    def to_dict(self):
        return {
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'status': self.status
        }
