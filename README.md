
<h1 align="center">Welcome to Allocate </h1>
<p>
  <a href="https://github.com/nicolyoshikawa/allocate/wiki" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

> [Allocate](https://allocate-py6y.onrender.com/) is a Splitwise clone created by Nicol Yoshikawa. Demonstrating an expert use of the technologies listed below, the team at Allocate has developed a web application to allow users to split expenses with friends, track balances, and settle balances.

## Technologies Used

Allocate was built using the following technologies:

- Python
- Flask
- SQLAlchemy/Alembic
- WTForms
- JavaScript
- React
- Redux
- AWS S3

### 🏠 [Homepage](https://allocate-py6y.onrender.com/home)

## Table of Contents

 - [Installing/Getting Started](https://github.com/nicolyoshikawa/allocate#installation)
	 - [Initial Configuration](https://github.com/nicolyoshikawa/allocate#initial-configuration)
- [Screenshots](https://github.com/nicolyoshikawa/allocate#screenshots)
- [Wiki Documents](https://github.com/nicolyoshikawa/allocate#wiki-documents)
	- API Routes
 	- Database Schema
 	- Features
 	- Frontend Routes
 	- React Components
 	- Redux Store Tree
	- User Stories
- [To-Dos/Future Features](https://github.com/nicolyoshikawa/allocate#to-dosfuture-features)
- [Technical Implementation Details](https://github.com/nicolyoshikawa/allocate#technical-implementation-details)
	- Challenges
	- Code Snippets
- [Author](https://github.com/nicolyoshikawa/allocate#author)

## Installation

### Initial Configuration
#### Flask
To install and run this project locally, start off with your backend server.

1. Clone this repository
    ```bash
    git clone https://github.com/nicolyoshikawa/allocate
    ```

2. Install dependencies
    ```bash
    pipenv install -r requirements.txt
    ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
    - Make sure the SQLite3 database connection URL is in the **.env** file
    - The env example organizes all tables inside the `flask_schema` schema, defined
        by the `SCHEMA` environment variable.  Replace the value for
        `SCHEMA` with a unique name, **making sure you use the snake_case
        convention**.
    <br></br>

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```
   and then
   ```bash
   flask db upgrade &&
   flask seed all &&
   flask run
   ```

5. Now that you have your backend Flask server running. You need to run the React App in development in a different terminal instance.

#### React
1. Make sure you have a new terminal instance seperate from your terminal for your backend. Navigate into the Allocate project folder and then into react-app folder.
    ```bash
    cd react-app
    ```

2. Install all your dependencies before starting up the application.
    ```bash
    npm install &&
    npm start
    ```

3. Now that you have both your Flask backend and React App frontend running, enjoy using Allocate!

### Operating
To run the application, navigate into the project folder in two separate terminal windows.

1. Ensure that the database has already been migrated and seeded. If it hasn't been done yet, refer to [Intitial Configuration](https://github.com/nicolyoshikawa/allocate#initial-configuration)

2. In one terminal, go into pipenv and run the Flask app
    ```bash
    pipenv shell && flask run
    ```

3. In the other terminal, start the React app.

4. Allocate will open in your browser and you can now enjoy using Allocate. 

## Screenshots

### Login/Sign Up

https://github.com/nicolyoshikawa/allocate/assets/112415366/d56a80b2-889a-4d8f-a657-ccac8c0b9d4d

### Friends

https://github.com/nicolyoshikawa/allocate/assets/112415366/1d257bfc-f16b-4803-88de-474d0621b061

### Expenses

https://github.com/nicolyoshikawa/allocate/assets/112415366/a949fbb3-071a-4c34-820b-406f0fd779ac

https://github.com/nicolyoshikawa/allocate/assets/112415366/6c300cf4-883a-4fca-8b12-8aa2c9f5f389

## [Wiki Documents](https://github.com/nicolyoshikawa/allocate/wiki)
- [API Routes](https://github.com/nicolyoshikawa/allocate/wiki/Backend-Routes)
- [Database Schema](https://github.com/nicolyoshikawa/allocate/wiki/Database-Schema)
- [Features](https://github.com/nicolyoshikawa/allocate/wiki/Feature-List)
- [Frontend Routes](https://github.com/nicolyoshikawa/allocate/wiki/Frontend-Routes)
- [React Components](https://github.com/nicolyoshikawa/allocate/wiki/React-Components)
- [Redux Store Tree](https://github.com/nicolyoshikawa/allocate/wiki/Redux-Store-Tree)
- [User Stories](https://github.com/nicolyoshikawa/allocate/wiki/User-Stories)


## To-Dos/Future Features

The project is fully functional in its current state, but some other features we would like to implement in the future include:
- Implement Comments feature, so a user can add comments to expenses
- Implement Groups feature, so a user can create groups with friends

## Technical Implementation Details

### Code Snippets

**Settle Balance**
```javascript
@balance_routes.route('/<int:friendId>/settle', methods=["PUT"])
@login_required
def settle_balance(friendId):
    userExpenses = Expense.query.join(ExpenseGroupUser,
                                      Expense.group_id == ExpenseGroupUser.group_id).filter(
                                        ExpenseGroupUser.user_id == current_user.id,
                                        Expense.settle_status == "unsettled").all()

    friendExpenses = Expense.query.join(ExpenseGroupUser,
                                        Expense.group_id == ExpenseGroupUser.group_id).filter(
                                            ExpenseGroupUser.user_id == friendId,
                                            Expense.settle_status == "unsettled").all()
    sharedExpenses = set(userExpenses).intersection(friendExpenses)

    for sharedExpense in sharedExpenses:
        sharedExpense.settle_status = "settled"
        db.session.commit()

    return { "message": ["Balance successfully settled"]}, 200
```

## Author

👤 **Nicol Yoshikawa**
* Nicol's [Github](https://github.com/nicolyoshikawa) and [LinkedIn](https://www.linkedin.com/in/nicol-yoshikawa/)
