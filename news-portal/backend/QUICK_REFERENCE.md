# Quick Reference Guide - News Portal Backend

## 🚀 Common Commands

### Database Operations

```bash
# Create database (run in MySQL)
CREATE DATABASE news_portal_db;

# Run all migrations
cd backend
npm run db:migrate

# Undo last migration
npm run db:migrate:undo

# Seed database with demo data
npm run db:seed

# Reset database (undo all, migrate, seed)
npm run db:reset
```

### Server Operations

```bash
# Install dependencies
cd backend
npm install

# Start development server (auto-reload)
npm run dev

# Start production server
npm start
```

### From Root Directory

```bash
# Install backend dependencies
npm run backend:install

# Start backend dev server
npm run backend:dev

# Run migrations from root
npm run backend:migrate

# Seed database from root
npm run backend:seed

# Reset database from root
npm run backend:reset
```

## 🔑 Authentication Flow

### 1. Register a User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { "id": 4, "name": "John Doe", "email": "john@example.com" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Use Token in Protected Routes

```http
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📰 News Operations

### Get All News (with pagination)

```http
GET /api/news?page=1&limit=10&sort=createdAt&order=DESC
```

### Get Single News (with author and comments)

```http
GET /api/news/1
```

### Create News (Authentication Required)

```http
POST /api/news
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Breaking News Title (min 5 chars)",
  "body": "News body content (min 10 chars)"
}
```

### Update News (Authentication Required - Own News Only)

```http
PUT /api/news/1
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Updated Title",
  "body": "Updated content"
}
```

### Delete News (Authentication Required - Own News Only)

```http
DELETE /api/news/1
Authorization: Bearer YOUR_TOKEN
```

## 💬 Comment Operations

### Get Comments for a News Article

```http
GET /api/comments/news/1/comments
```

### Add Comment (Authentication Required)

```http
POST /api/comments/news/1/comments
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "text": "Great article!"
}
```

### Update Comment (Authentication Required - Own Comment Only)

```http
PUT /api/comments/5
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "text": "Updated comment"
}
```

### Delete Comment (Authentication Required - Own Comment Only)

```http
DELETE /api/comments/5
Authorization: Bearer YOUR_TOKEN
```

## 🧪 Testing with cURL

### Register and Login

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'

# Save the token from response
TOKEN="paste_token_here"
```

### CRUD Operations

```bash
# Get all news
curl http://localhost:5000/api/news

# Get specific news
curl http://localhost:5000/api/news/1

# Create news
curl -X POST http://localhost:5000/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Test News Article","body":"This is the content of the test article."}'

# Update news (use appropriate ID)
curl -X PUT http://localhost:5000/api/news/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Updated Title","body":"Updated content"}'

# Delete news
curl -X DELETE http://localhost:5000/api/news/1 \
  -H "Authorization: Bearer $TOKEN"
```

## 📝 Validation Rules Reference

### User Registration
- **name**: 2-100 characters, required
- **email**: Valid email, required, unique
- **password**: Min 6 characters, required

### News Creation/Update
- **title**: 5-255 characters, required
- **body**: Min 10 characters, required

### Comment Creation/Update
- **text**: 1-1000 characters, required

## 🔍 Common Error Codes

| Status Code | Meaning | Common Causes |
|-------------|---------|---------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Validation errors, invalid input |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Trying to modify others' content |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Database or server issue |

## 🗂️ File Structure Quick Reference

```
backend/
├── config/              # Configuration files
│   ├── database.js      # Sequelize config for CLI
│   └── db.js           # Database connection
│
├── controllers/         # Business logic
│   ├── authController.js    # Login, register, getMe
│   ├── userController.js    # User CRUD
│   ├── newsController.js    # News CRUD
│   └── commentController.js # Comment CRUD
│
├── middleware/          # Middleware functions
│   ├── auth.js         # JWT verification
│   ├── validate.js     # Validation error handler
│   └── errorHandler.js # Global error handler
│
├── migrations/          # Database migrations (versioned)
│   ├── *-create-users.js
│   ├── *-create-news.js
│   └── *-create-comments.js
│
├── models/             # Database models
│   ├── User.js        # User model + password hashing
│   ├── News.js        # News model
│   ├── Comment.js     # Comment model
│   └── index.js       # Model associations
│
├── routes/            # API routes
│   ├── authRoutes.js  # /api/auth/*
│   ├── userRoutes.js  # /api/users/*
│   ├── newsRoutes.js  # /api/news/*
│   ├── commentRoutes.js # /api/comments/*
│   └── index.js       # Route aggregator
│
├── seeders/           # Database seeders
│   ├── *-demo-users.js
│   ├── *-demo-news.js
│   └── *-demo-comments.js
│
├── validators/        # Validation rules
│   ├── authValidator.js
│   ├── newsValidator.js
│   └── commentValidator.js
│
├── .env              # Environment variables (not in git)
├── .env.example      # Environment template
└── server.js         # Main server file
```

## 🔧 Environment Variables

```env
# Server
PORT=5000                    # Server port
NODE_ENV=development         # development/production/test

# Database
DB_HOST=localhost            # MySQL host
DB_PORT=3306                # MySQL port
DB_NAME=news_portal_db      # Database name
DB_USER=root                # MySQL username
DB_PASSWORD=                # MySQL password

# JWT
JWT_SECRET=your_secret_key  # Secret for signing tokens
JWT_EXPIRES_IN=24h          # Token expiration time

# CORS
CLIENT_URL=http://localhost:5500  # Frontend URL
```

## 🎯 Quick Debugging Tips

### Database Connection Issues
```bash
# Test MySQL connection
mysql -u root -p

# Check if database exists
SHOW DATABASES;

# Verify user permissions
SHOW GRANTS FOR 'root'@'localhost';
```

### Migration Issues
```bash
# Check migration status (will be added via Sequelize CLI)
npx sequelize-cli db:migrate:status

# Undo all and re-run
npm run db:migrate:undo:all
npm run db:migrate
```

### Server Not Starting
```bash
# Check if port is in use
netstat -ano | findstr :5000   # Windows
lsof -i :5000                  # Mac/Linux

# Kill process using port (Windows)
taskkill /PID <PID> /F

# Check Node version
node --version  # Should be v14+
```

### Authentication Issues
```bash
# Check if JWT_SECRET is set
Get-Content backend\.env | Select-String JWT_SECRET  # PowerShell
cat backend/.env | grep JWT_SECRET                   # Linux/Mac

# Verify token format in request
# Should be: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📚 Sequelize Model Methods

### Create
```javascript
const user = await User.create({ name, email, password });
const news = await News.create({ title, body, authorId });
```

### Find
```javascript
// Find by primary key
const user = await User.findByPk(1);

// Find one
const user = await User.findOne({ where: { email: 'test@example.com' } });

// Find all
const users = await User.findAll();

// Find with associations
const news = await News.findByPk(1, {
  include: [
    { model: User, as: 'author' },
    { model: Comment, as: 'comments' }
  ]
});
```

### Update
```javascript
await user.update({ name: 'New Name' });
```

### Delete
```javascript
await user.destroy();
```

## 🎨 Response Format Examples

### Success Response
```json
{
  "success": true,
  "message": "News created successfully",
  "data": {
    "news": {
      "id": 1,
      "title": "Breaking News",
      "body": "Content here",
      "authorId": 1,
      "createdAt": "2025-12-10T10:00:00.000Z",
      "updatedAt": "2025-12-10T10:00:00.000Z"
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title must be between 5 and 255 characters"
    }
  ]
}
```

### Paginated Response
```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "totalPages": 3,
  "currentPage": 1,
  "data": {
    "news": [ /* array of news objects */ ]
  }
}
```

## 💡 Tips & Best Practices

1. **Always use try-catch** in async functions
2. **Validate input** before processing
3. **Use meaningful HTTP status codes**
4. **Don't expose sensitive data** in responses
5. **Hash passwords** before storing
6. **Use transactions** for multiple DB operations
7. **Add indexes** on frequently queried fields
8. **Paginate** large result sets
9. **Use environment variables** for config
10. **Document your API** clearly

---

**Keep this guide handy for quick reference during development!** 📖
