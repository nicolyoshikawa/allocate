from flask.cli import AppGroup
from .users import seed_users, undo_users
from .expenses import seed_expenses, undo_expenses
# from .comments import seed_comments, undo_comments
from .friends import seed_friends, undo_friends
from .expenseGroups import seed_groups, undo_groups
from .expenseGroupUsers import seed_group_users, undo_group_users

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).

        # Make sure to add all your other model's undo functions below
        # undo_users()
        # undo_expenses()
        # undo_reviews()
        # undo_friends()

        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenses RESTART IDENTITY CASCADE;")
        # db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenseGroups RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenseGroupUsers RESTART IDENTITY CASCADE;")

        db.session.commit()
    seed_users()
    # Add other seed functions here
    seed_expenses()
    # seed_comments()
    seed_friends()
    seed_groups()
    seed_group_users()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_expenses()
    # undo_comments()
    undo_friends()
    undo_groups()
    undo_group_users()
