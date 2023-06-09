# Requisites
- Node JS v18.16.0
- NPM v9.5.1
- PostgreSQL 14.8

# Installation
1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Copy the file .envsample and rename it to .env
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