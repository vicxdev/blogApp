# How does it work?
## Node
- The 'npm run start' is executed
- In database.js the connections to the database with the Sequelize are defined
- An instance of Express is initialized in app.js and its routes and middlewares are defined there (the routes point to the note controllers and users)
- Sequelize models are synchronized with the database in index.js/main() and the server runs

## React
- The 'npm run start' is executed
- The 'react-scripts start' utility is executed and this starts the development server
- The 'App' component is called in index.js
- The 'App' component handles the pagination and notes states, in order to pass the results to the 'NoteList' (where notes are listed and edited) and 'NoteAddForm' (where notes are added) components. It also handles the state of the user to be able to pass its result to the component 'LoginForm'

# Comments/Improvements
- I would add a more secure login method, as well as verify that the field meets some requirements
- In larger projects, I would use migrations instead of sync(), because it can lead to data loss.
- I would improve the 'try & catch's to handle more specific cases and be able to return responses to the user more in line with the errors that arise
- If we were using microservices, the media folder could go outside of client and server
- On the React side, I would componentize most of the HTML, like the modal, the NavBar, etc.
- Also in React, I would remove refreshes and use states to make it more dynamic

# Requisites
- Node JS v18.16.0
- NPM v9.5.1
- PostgreSQL 14.8

# Installation
1. Clone the repository
2. Install server dependencies
```bash
cd server
npm install
```
4. Install client dependencies
```bash
cd client
npm install
```
3. Copy .envsample file and rename it to .env (/server and /client use different files)
4. Create a database in PostgreSQL and fill the variables in .env
5. Run server
```bash
cd server
npm run start
```
6. Run client
```bash
cd client
npm run start
```

# API Documentation
## Users
### Login and Register
```bash
POST /login
```

## Notes
### Get all notes
```bash
GET /notes
```

### Get a note
```bash
GET /notes/:id
```

### Create a note
```bash
POST /notes
```

### Update a note
```bash
PUT /notes/:id
```

### Delete a note
```bash
DELETE /notes/:id
```
