# Comments/Improvements:
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
