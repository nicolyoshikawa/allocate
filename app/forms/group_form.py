from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, DateField, FloatField
from wtforms.validators import DataRequired, Length, URL, Optional, NumberRange
from app.api.aws_util import ALLOWED_EXTENSIONS
from app.models import User

class GroupForm(FlaskForm):
    name = StringField('Name', validators=[Length(min=0, max=50)])
    friend_id = IntegerField('Friend Id', validators=[DataRequired(), NumberRange(min=0)])
