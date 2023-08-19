from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Length, URL, Optional, NumberRange
from app.models import User

class Expense(FlaskForm):
    description = StringField('Description', validators=[DataRequired()])
    paid_by = StringField('Paid By', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired(), NumberRange(min=0, max=100)])
    receipt_img_url = StringField("Receipt Image", validators=[Length(min=0, max=255), URL(), Optional()])
    expense_date = DateField("Expense Date")
