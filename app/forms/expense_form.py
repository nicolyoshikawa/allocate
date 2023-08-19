from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Length, URL, Optional, NumberRange
from app.models import User

class ExpenseForm(FlaskForm):
    description = StringField('Description', validators=[DataRequired(), Length(min=0, max=500)])
    # paid_by = StringField('Paid By', validators=[DataRequired()])
    group_id = IntegerField('Group Id', validators=[NumberRange(min=0), Optional()])
    price = IntegerField('Price', validators=[DataRequired(), NumberRange(min=0)])
    receipt_img_url = StringField("Receipt Image", validators=[Length(min=0, max=255), URL(), Optional()])
    expense_date = DateField("Expense Date")
    friend_id = IntegerField('Friend Id', validators=[DataRequired(), NumberRange(min=0)])
