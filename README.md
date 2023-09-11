
<h1 align="center">Welcome to Allocate </h1>
<p>
  <a href="https://github.com/nicolyoshikawa/allocate/wiki" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

> [Allocate](https://allocate-py6y.onrender.com/) is a Splitwise clone created by Nicol Yoshikawa.
>
> Demonstrating an expert use of the technologies listed below, the team at Allocate has developed a web application to allow users to explore, share, and review their favorite (or not so favorite) drinks, while connecting with fellow enthusiasts. Allocate is your passport to drink discovery and community engagement. Join us now!

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

### Login

### Friends

### Expenses


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

**Add/Edit Expense Component**
```javascript
    useEffect(()=> {
        dispatch(friendActions.getUserFriends())
        dispatch(expenseActions.loadAllUserExpenses())
        dispatch(expenseActions.loadExpenseById(expense?.id))
        .then((expObj)=>{
            if(expObj){
                const friendArr = expObj.expense_group_users.filter(el=> el.id !== user_id);
                setReceipt_img_url(expObj.receipt_img_url);
                setDescription(expObj.description);
                setPrice(expObj.price);
                setGroup_id(expObj.group_id);
                setExpense_date(expObj.expense_date);
                setFriend_id(friendArr[0].id)
            }
        })
    },[dispatch, expense?.id, expense?.receipt_img_url, expense?.description, expense?.price, expense?.group_id, expense?.expense_date, user_id]);

const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
...
    if(Object.values(errors).length === 0){
        setErrors([]);

        if(expLength === 0){
            const createExpense = await dispatch(expenseActions.createANewExpense(newExpense));
	...
        }
        if(expLength > 0){
            const updatedExpense = await dispatch(expenseActions.updateAnExpense(updateExpense, expense?.id));
	...
        }
    }
  };
```

## Author

👤 **Nicol Yoshikawa**
* Nicol's [Github](https://github.com/nicolyoshikawa) and [LinkedIn](https://www.linkedin.com/in/nicol-yoshikawa/)
