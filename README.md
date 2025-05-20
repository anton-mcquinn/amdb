# 🎬 AMDB - Anton's Movie Database

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

#### Additional sources used for this project:
- [Sequelize Documentation](https://sequelize.org/)
- [Material-UI Documentation](https://mui.com/)
- [Bulk Insert JSON Data into PostgreSQL](https://dev.to/yugabyte/bulk-loading-data-in-postgresql-with-nodejs-and-sequelize-1bn7)
- [wikipedia-movie-data](https://github.com/prust/wikipedia-movie-data?tab=readme-ov-file)
- [How to set up a node.js backend with typescript](https://dev.to/sulistef/how-to-set-up-a-nodejs-backend-using-expressjs-and-typescript-1655)
- [Node-Postgres docs](https://node-postgres.com/apis/pool)


A movie database application built for a Cornerstone Systems Northwest interview project.

## 📝 Description

This project is a full-stack Movie Database web application that allows users to:

- Browse movies by genre and decade
- Rate movies with a star-based system
- Get personalized movie recommendations based on ratings

The project uses React for the frontend, Express for the backend, and PostgreSQL for data storage.

## 🚀 Features

- **Main Branch**: Basic movie browsing functionality with filtering
- **Ratings Branch**: Enhanced features including:
  - Star-rating system for movies
  - User preference tracking
  - Personalized movie recommendations

## 📋 Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone git@github.com:anton-mcquinn/amdb.git
cd amdb
```

### 2. Install dependencies

Install dependencies for both backend and frontend:

```bash
# Root directory dependencies
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 3. Database Setup

Create a PostgreSQL database:

```bash
createdb amdb
```

### 4. Environment Configuration


Create a `.env` file in the rootdirectory using the provided example:

```bash
cp .env.example .env
```

Edit the `.env` file with your database credentials if they differ from the defaults.

### 5. Seed the Database

Run the database seeding script:

```bash
node load_db.js
```

This will create all necessary tables and populate them with data from the included JSON files.

## 🏃‍♂️ Running the Application

### Start the Backend
Create a .env in the backend directory using the provided example:

```bash
cd backend
cp .env.example .env
```
npm run start
```

The backend server will start on http://localhost:3000.

### Start the Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend development server will start and open in your default browser.

## 💻 Usage

1. Browse the main page to see all movies
2. Use the genre and decade filters to find specific movies
3. If using the ratings branch, rate movies to get personalized recommendations

## 🔍 Project Structure

```
amdb/
├── backend/         # Express backend code
│   ├── src/         # Source files
│   └── ...
├── frontend/        # React frontend code
│   ├── src/         # Source files
│   └── ...
├── load_db.js       # Database seeding script
├── movies.json      # Movie data
└── genres.json      # Genre data
```

## 🧪 Technologies Used

- **Frontend**: React, TypeScript, Material-UI
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **ORM**: Sequelize

## 👤 Author

- **Anton McQuinn**

---

*This project was created for an interview with Cornerstone Systems Northwest.*
