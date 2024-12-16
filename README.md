**Before starting the readme, I couldn't finish the project because my computer kept crashing. If you would give me more time I would release something more co-built.I'm sorry**

# Application de gestion de projets

# Project Management App - Backend

This repository contains the backend part of a project management web application. The backend is built using **Node.js** with **Express** as the framework and **PostgreSQL** as the database.

## Features

- **CRUD** for categories
- **CRUD** for projects
- Ability to filter projects by category
- User authentication and management (via a `users` table)
- Relations between projects and users

## Prerequisites

Before you begin, ensure that you have the following installed on your local machine:

- **Node.js** (v16 or later)
- **npm** (v7 or later)
- **PostgreSQL** (v13 or later)

### Setting up PostgreSQL

1. **Install PostgreSQL** if you don't have it installed already:
   - [PostgreSQL Download](https://www.postgresql.org/download/)
   
2. **Create a new database**:
   After installing PostgreSQL, create a new database for your project:
   
   ```bash
   psql -U postgres
   CREATE DATABASE management_project;

   \c management_project

   CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  status VARCHAR(50) NOT NULL,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Create a categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Link projects and categories (optional, if categories exist)
CREATE TABLE project_categories (
  project_id INTEGER,
  category_id INTEGER,
  PRIMARY KEY (project_id, category_id),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);'''

## Create necessary tables: Use the SQL file setup.sql to create the tables. The users table and projects table will be automatically created.
## Create a .env file at the root of your project with the following database configuration

DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=management_project
DB_PASSWORD=2004
DB_PORT=5432

## Installation
Clone the repository to your local machine

git clone https://github.com/belgina29/project-management-backend.git

cd project-management-backend

npm install

## Usage
Run the server
To start the server, use the following command

npm run start 

## Database Structure
The database consists of the following tables

users:
id (Primary Key)
username (Unique)
email (Unique)
password_hash (Hashed password)
role (User role: 'admin', 'user', etc.)
created_at (Timestamp)
updated_at (Timestamp)

projects:
id (Primary Key)
name (Project name)
description (Project description)
start_date (Start date)
end_date (End date)
status (Project status: 'active', 'completed', 'on hold', etc.)
user_id (Foreign Key referencing users.id)
created_at (Timestamp)
updated_at (Timestamp)

categories:
id (Primary Key)
name (Category name)
created_at (Timestamp)
updated_at (Timestamp)


## API Endpoints

User Routes

POST /api/users: Create a new user.
GET /api/users: Get all users.
GET /api/users/:id: Get a specific user by ID.
PUT /api/users/:id: Update a specific user.
DELETE /api/users/:id: Delete a specific user.

Project Routes

POST /api/projects: Create a new project.
GET /api/projects: Get all projects.
GET /api/projects/:id: Get a specific project by ID.
PUT /api/projects/:id: Update a specific project.
DELETE /api/projects/:id: Delete a specific project.

Category Routes (if implemented)

POST /api/categories: Create a new category.
GET /api/categories: Get all categories.
GET /api/categories/:id: Get a specific category by ID.
PUT /api/categories/:id: Update a specific category.
DELETE /api/categories/:id: Delete a specific category.

Project Filtering by Category (if categories are implemented)

GET /api/projects?category_id=:id: Get projects filtered by category.
Tests
Test the API using tools like Postman or Insomnia.
You can also write unit and integration tests using libraries like Jest or Mocha.
Development
To contribute to the development of this project:

Fork the repository.
Clone your forked repository.
Create a new branch for your changes.
Commit your changes.
Push the changes to your forked repository.
Create a pull request for review.

Later you can also implement the **JWT** but due to lack of time I did not do it

# Project Management App - Frontend

This project is a project management interface with an admin dashboard using **React**, **Framer Motion** for animations, and **Axios** for retrieving data from an API.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (version 16 or higher)
- **npm** (Node.js package manager)

### Installation

1. **Clone this repository** to your local machine:
   ```bash
   git clone https://github.com/belgina29/project-management.git

2. **Install the project dependencies: In the project directory, run the following command to install the required dependencies**

```bash
npm install
npm run dev

### Usage
Once the application is running, here are the main features

Animated Dashboard: The admin dashboard shows a welcome message with an animation on the home screen.
Sidebar: The sidebar allows navigation between different sections (Home, Categories, Projects).
API Interaction: When accessing the dashboard, data is fetched from an API (provided at http://localhost:3000/api/data in this example). You can customize this URL to match your project's API.
Project Structure


### Technologies Used
React: JavaScript library for building user interfaces.
Framer Motion: Library for creating smooth animations.
Axios: HTTP client for making API requests.
Vite: Fast modern build tool for front-end applications.
Tailwind CSS: Utility-first CSS framework for rapid layout and design.
