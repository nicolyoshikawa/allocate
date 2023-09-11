
<h1 align="center">Welcome to Allocate </h1>
<p>
  <a href="https://github.com/nicolyoshikawa/allocate/wiki" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

> [Pour'd](https://pourd.onrender.com/) is an Untappd clone created by Eric Kinder, Nicol Yoshikawa, and Huey Nguyen. Demonstrating an expert use of the technologies listed below, the team at Pour'd has developed a web application to allow users to explore, share, and review their favorite (or not so favorite) drinks, while connecting with fellow enthusiasts. Pour'd is your passport to drink discovery and community engagement. Join us now!

## Technologies Used

Pour'd was built using the following technologies:

- Python
- Flask
- SQLAlchemy/Alembic
- WTForms
- JavaScript
- React
- Redux

![image](https://github.com/nicolyoshikawa/pour-d/assets/78172054/c4d9ef19-e79c-4fe0-8804-e1164b621846)

### 🏠 [Homepage](https://pourd.onrender.com/home)

## Table of Contents

 - [Installing/Getting Started](https://github.com/nicolyoshikawa/pour-d/blob/main/README.md#installation)
	 - [Initial Configuration](https://github.com/nicolyoshikawa/pour-d/blob/main/README.md#initial-configuration)
- [Screenshots](https://github.com/nicolyoshikawa/pour-d/blob/main/README.md#screenshots)
- [Wiki Documents](https://github.com/nicolyoshikawa/pour-d/blob/main/README.md#wiki-documents)
	- API Routes
 	- Database Schema
 	- Features
 	- Frontend Routes
 	- React Components
 	- Redux Store Tree
	- User Stories
	- Wireframes 
- [To-Dos/Future Features](https://github.com/nicolyoshikawa/pour-d/blob/main/README.md#to-dosfuture-features)
- [Technical Implementation Details](https://github.com/nicolyoshikawa/pour-d/blob/main/README.md#technical-implementation-details)
	- Challenges
	- Code Snippets
- [Authors](https://github.com/nicolyoshikawa/pour-d/blob/main/README.md#authors)
- [Show your support](https://github.com/nicolyoshikawa/pour-d/blob/main/README.md#show-your-support)

## Installation

### Initial Configuration
#### Flask
To install and run this project locally, start off with your backend server.

1. Clone this repository
    ```bash
    git clone https://github.com/nicolyoshikawa/pour-d.git
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
1. Make sure you have a new terminal instance seperate from your terminal for your backend. Navigate into the pour'd project folder and then into react-app folder.
    ```bash
    cd react-app
    ```

2. Install all your dependencies before starting up the application.
    ```bash
    npm install &&
    npm start
    ```

3. Now that you have both your Flask backend and React App frontend running, enjoy using Pour'd. Cheers!

### Operating
To run the application, navigate into the project folder in two separate terminal windows.

1. Ensure that the database has already been migrated and seeded. If it hasn't been done yet, refer to [Intitial Configuration](https://github.com/nicolyoshikawa/pour-d/blob/main/README.md#initial-configuration)

2. In one terminal, go into pipenv and run the Flask app
    ```bash
    pipenv shell && flask run
    ```

3. In the other terminal, start the React app.

4. Pour'd will open in your browser and you can now enjoy using Pour'd. Cheers!

## Screenshots

### Login

![image](https://github.com/nicolyoshikawa/pour-d/assets/78172054/ac0d5485-27b7-440e-a824-28df365977e4)

### Profile

![ezgif com-gif-maker](https://github.com/nicolyoshikawa/pour-d/assets/112415366/411fb169-c4b6-4530-b77c-d4d6473de871)

### Drinks

https://github.com/nicolyoshikawa/pour-d/assets/112415366/f89fecdf-d4a3-4b8c-854e-49713ac7fb34

### Reviews

https://github.com/nicolyoshikawa/pour-d/assets/112415366/3ff2f7db-c294-492e-876d-f9dd486bb05f

### Friends

https://github.com/nicolyoshikawa/pour-d/assets/112415366/5e72eff5-64e3-4592-a758-d030d5945de2

## [Wiki Documents](https://github.com/nicolyoshikawa/pour-d/wiki)
- [API Routes](https://github.com/nicolyoshikawa/pour-d/wiki/Backend-Routes)
- [Database Schema](https://github.com/nicolyoshikawa/pour-d/wiki/Database-Schema)
- [Features](https://github.com/nicolyoshikawa/pour-d/wiki/Feature-List)
- [Frontend Routes](https://github.com/nicolyoshikawa/pour-d/wiki/Frontend-Routes)
- [React Components](https://github.com/nicolyoshikawa/pour-d/wiki/React-Components)
- [Redux Store Tree](https://github.com/nicolyoshikawa/pour-d/wiki/Redux-Store-Tree)
- [User Stories](https://github.com/nicolyoshikawa/pour-d/wiki/User-Stories)
- [Wireframes](https://github.com/nicolyoshikawa/pour-d/wiki/Wireframes)


## To-Dos/Future Features

The project is fully functional in its current state, but some other features we would like to implement in the future include:

- Ability to upload images for drinks and reviews with AWS
- Fully featured friends system with ability to view other users profiles and send friend requests
- "Load more" style pagination when viewing all drinks or reviews

## Technical Implementation Details

### Code Snippets

**Search box component**
```javascript
    const dispatch = useDispatch()

    const drinks = useSelector(state => state.drinks) // Load all drinks for search bar to query
    const [searchInput, setSearchInput] = useState("") // Set current query to user's input
    let hideDiv // Used for removing border if search results are empty

    useEffect(() => {
        dispatch(loadAllDrinks())
    }, [dispatch])

    const onClickHandler = () => {
        setSearchInput("")
    }


    if (drinks) {
        // Create array of drinks with name matching current input from user
        let filterDrinks = Object.values(drinks).filter((drink) => {
            if (searchInput.length && drink.name.toLowerCase().includes(searchInput.toLowerCase())) {
                return drink
            }
        })

        // Remove border if results are empty
        if (searchInput.length && filterDrinks.length) {
            hideDiv = "results"
        } else {
            hideDiv = "results-hide"
        }
    return (
	...
	)}
```

## Author

👤 **Nicol Yoshikawa**
* Nicol's [Github](https://github.com/nicolyoshikawa) and [LinkedIn](https://www.linkedin.com/in/nicol-yoshikawa/)
