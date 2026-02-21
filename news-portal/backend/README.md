# News Portal Backend API

A professional RESTful API for the News Portal application built with Express.js, Sequelize ORM, MySQL, and JWT authentication.

## Features

✅ **Token-based Authentication** - JWT authentication with refresh tokens  
✅ **Database Migrations** - Version control for database schema  
✅ **ORM (Sequelize)** - Object-Relational Mapping for MySQL  
✅ **Environment Variables** - Secure configuration with .env  
✅ **Database Seeders** - Populate initial data  
✅ **RESTful API Design** - Standard HTTP methods and status codes  
✅ **Request Validation** - Input validation with express-validator  
✅ **Separation of Concerns** - MVC architecture (Models, Controllers, Routes)  
✅ **Error Handling** - Centralized error handling middleware  
✅ **Password Hashing** - Secure password storage with bcrypt  
✅ **CORS Support** - Cross-origin resource sharing enabled  

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Password Hashing**: bcryptjs
- **Environment**: dotenv

## Project Structure

```
backend/
├── config/
│   ├── database.js      # Sequelize configuration
│   └── db.js            # Database connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User CRUD operations
│   ├── newsController.js    # News CRUD operations
│   └── commentController.js # Comment CRUD operations
├── middleware/
│   ├── auth.js          # JWT authentication middleware
│   ├── validate.js      # Validation middleware
│   └── errorHandler.js  # Error handling middleware
├── migrations/
│   ├── 20250101000001-create-users.js
│   ├── 20250101000002-create-news.js
│   └── 20250101000003-create-comments.js
├── models/
│   ├── User.js          # User model
│   ├── News.js          # News model
│   ├── Comment.js       # Comment model
│   └── index.js         # Models and associations
├── routes/
│   ├── authRoutes.js    # Authentication routes
│   ├── userRoutes.js    # User routes
│   ├── newsRoutes.js    # News routes
│   ├── commentRoutes.js # Comment routes
│   └── index.js         # Route aggregator
├── seeders/
│   ├── 20250101000001-demo-users.js
│   ├── 20250101000002-demo-news.js
│   └── 20250101000003-demo-comments.js
├── validators/
│   ├── authValidator.js    # Authentication validation
│   ├── newsValidator.js    # News validation
│   └── commentValidator.js # Comment validation
├── .env                 # Environment variables
├── .env.example         # Example environment file
├── .gitignore          # Git ignore rules
├── .sequelizerc        # Sequelize CLI configuration
├── package.json        # Dependencies and scripts
└── server.js           # Main application file
```

## Installation & Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update the values:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=news_portal_db
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=24h

CLIENT_URL=http://localhost:5500
```

### 3. Create Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE news_portal_db;
exit;
```

### 4. Run Migrations

```bash
npm run db:migrate
```

### 5. Seed Database (Optional)

```bash
npm run db:seed
```

### 6. Start Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## Database Schema

### Users Table
```sql
- id (INT, PK, AUTO_INCREMENT)
- name (VARCHAR 100, NOT NULL)
- email (VARCHAR 100, UNIQUE, NOT NULL)
- password (VARCHAR 255, NOT NULL, HASHED)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### News Table
```sql
- id (INT, PK, AUTO_INCREMENT)
- title (VARCHAR 255, NOT NULL)
- body (TEXT, NOT NULL)
- author_id (INT, FK -> users.id)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Comments Table
```sql
- id (INT, PK, AUTO_INCREMENT)
- text (TEXT, NOT NULL)
- user_id (INT, FK -> users.id)
- news_id (INT, FK -> news.id)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

## API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "user": { ... }
  }
}
```

### User Routes

#### Get All Users
```http
GET /api/users

Response: 200 OK
{
  "success": true,
  "count": 3,
  "data": {
    "users": [...]
  }
}
```

#### Get User by ID
```http
GET /api/users/:id

Response: 200 OK
{
  "success": true,
  "data": {
    "user": { ... }
  }
}
```

#### Update User
```http
PUT /api/users/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com"
}

Response: 200 OK
```

#### Delete User
```http
DELETE /api/users/:id
Authorization: Bearer {token}

Response: 200 OK
```

### News Routes

#### Get All News (with pagination)
```http
GET /api/news?page=1&limit=10&sort=createdAt&order=DESC

Response: 200 OK
{
  "success": true,
  "count": 10,
  "total": 25,
  "totalPages": 3,
  "currentPage": 1,
  "data": {
    "news": [...]
  }
}
```

#### Get News by ID
```http
GET /api/news/:id

Response: 200 OK
{
  "success": true,
  "data": {
    "news": {
      "id": 1,
      "title": "...",
      "body": "...",
      "author": { ... },
      "comments": [...]
    }
  }
}
```

#### Create News
```http
POST /api/news
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Breaking News Title",
  "body": "News content goes here..."
}

Response: 201 Created
```

#### Update News
```http
PUT /api/news/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "body": "Updated content"
}

Response: 200 OK
```

#### Delete News
```http
DELETE /api/news/:id
Authorization: Bearer {token}

Response: 200 OK
```

### Comment Routes

#### Get Comments for News
```http
GET /api/comments/news/:newsId/comments

Response: 200 OK
{
  "success": true,
  "count": 5,
  "data": {
    "comments": [...]
  }
}
```

#### Create Comment
```http
POST /api/comments/news/:newsId/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "Great article!"
}

Response: 201 Created
```

#### Update Comment
```http
PUT /api/comments/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "Updated comment text"
}

Response: 200 OK
```

#### Delete Comment
```http
DELETE /api/comments/:id
Authorization: Bearer {token}

Response: 200 OK
```

## Validation Rules

### User Registration
- Name: 2-100 characters, required
- Email: Valid email format, required, unique
- Password: Minimum 6 characters, required

### News Creation
- Title: 5-255 characters, required
- Body: Minimum 10 characters, required

### Comment Creation
- Text: 1-1000 characters, required

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After login or registration, include the token in the Authorization header:

```
Authorization: Bearer {your_token_here}
```

Token expires in 24 hours by default (configurable in .env).

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Database Commands

### Migration Commands
```bash
# Run all migrations
npm run db:migrate

# Undo last migration
npm run db:migrate:undo

# Undo all migrations
npm run db:migrate:undo:all
```

### Seeder Commands
```bash
# Run all seeders
npm run db:seed

# Undo all seeders
npm run db:seed:undo

# Reset database (undo all, migrate, seed)
npm run db:reset
```

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt before storage
2. **JWT Authentication**: Secure token-based authentication
3. **Input Validation**: All inputs are validated and sanitized
4. **SQL Injection Protection**: Sequelize ORM prevents SQL injection
5. **CORS Configuration**: Configurable cross-origin resource sharing
6. **Environment Variables**: Sensitive data stored in .env file

## Best Practices Implemented

✅ **Separation of Concerns**: Models, Controllers, Routes, Middleware separated  
✅ **RESTful API Design**: Standard HTTP methods and resource naming  
✅ **Error Handling**: Centralized error handling middleware  
✅ **Input Validation**: Request validation using express-validator  
✅ **Database Migrations**: Version-controlled database schema  
✅ **Environment Configuration**: .env for different environments  
✅ **Code Organization**: Clear folder structure and file naming  
✅ **Security**: Password hashing, JWT, input sanitization  
✅ **Database Relationships**: Proper foreign keys and associations  
✅ **Pagination**: Efficient data fetching for large datasets  

## Testing the API

You can test the API using:
- **Postman**: Import the endpoints and test
- **cURL**: Command-line testing
- **Thunder Client**: VS Code extension
- **Browser**: For GET requests only

### Example cURL Request
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get all news
curl http://localhost:5000/api/news
```

## Troubleshooting

### Database Connection Error
- Check MySQL is running
- Verify database credentials in .env
- Ensure database exists

### Migration Error
- Check database connection
- Verify migration files are in correct order
- Try running migrations individually

### Authentication Error
- Check JWT_SECRET is set in .env
- Verify token is included in Authorization header
- Check token format: "Bearer {token}"

## License

ISC

## Author

Web Technology Lab - 5th Semester

---

**Note**: Remember to change `JWT_SECRET` in production and never commit `.env` file to version control.
