# Project Overview
Build a RESTful API for a task management system using Node.js and Express.

# Tech Stack
- Node.js
- Express
- MongoDB
- JWT for authentication

# Database Schema
```
User {
  id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date
}

Task {
  id: ObjectId,
  title: String,
  description: String,
  status: String (enum: 'todo', 'in-progress', 'done'),
  dueDate: Date,
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

# Requirements
1. User authentication
   - Register new users
   - Login existing users
   - Password reset functionality

2. Task management
   - Create, read, update, delete tasks
   - Filter tasks by status, due date
   - Mark tasks as complete

3. Data validation
   - Validate all inputs
   - Return appropriate error messages

# API Endpoints
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user
- GET /api/tasks - Get all tasks for the authenticated user
- POST /api/tasks - Create a new task
- GET /api/tasks/:id - Get a specific task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

# Authentication
Use JWT (JSON Web Tokens) for authentication:
- Generate token on login
- Include token in Authorization header for protected routes
- Implement middleware to verify token

# Documentation
Implement Swagger documentation for all API endpoints.
