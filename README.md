# amdb
Anton's Movie Database - A CSNW Interview Project

## Description
This project was prepared for an interview with Cornerstone Systems Northwest. The project consists of a simple Movie Database
web application that will allow a user to sort by Genre and Decade. The branch titled 'ratings' has an implementation of a rating system for users to add "stars" to movies they like and in return get suggestions based on their liked movies.

## How to run the application
1. Clone the repository to your local machine.
```bash
git clone git@github.com:anton-mcquinn/amdb.git ```
2. Navigate to the project directory.
```bash 
cd amdb ```
3. Install the required dependencies.
```bash 
npm install ```
4. Create a PostgreSQL Database
```bash
createdb amdb ```
5. Create a .env file using the .env.example file as a template.

### Seeding the Database
Seeding the database will happen using the included load_db.js file. This file will create the necessary tables and seed them with data from the included genres.json and movies.json files.

```bash
node load_db.js
```
6. Start the Backend
```bash
cd backend
npm run start
```
7. Start the Frontend
```bash 
cd frontend
npm run dev
```
8. Open a browser and navigate to http://localhost:3000 to view the application.

