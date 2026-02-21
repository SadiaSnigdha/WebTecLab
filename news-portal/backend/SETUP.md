# Quick Setup Guide

Follow these steps to set up and run the News Portal Backend:

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Step-by-Step Setup

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file with your database credentials
# DB_USER=root
# DB_PASSWORD=your_mysql_password
# DB_NAME=news_portal_db
```

### Step 3: Create Database

Open MySQL command line:

```bash
mysql -u root -p
```

Create the database:

```sql
CREATE DATABASE news_portal_db;
SHOW DATABASES;
EXIT;
```

### Step 4: Run Migrations

```bash
npm run db:migrate
```

Expected output:
```
✓ Database connection established successfully
✓ Migration: 20250101000001-create-users.js migrated
✓ Migration: 20250101000002-create-news.js migrated
✓ Migration: 20250101000003-create-comments.js migrated
```

### Step 5: Seed Database (Optional)

```bash
npm run db:seed
```

This will create:
- 3 demo users (password: "password123")
- 3 news articles
- 4 comments

### Step 6: Start the Server

```bash
# Development mode (auto-reload on changes)
npm run dev

# Or production mode
npm start
```

You should see:
```
✓ Database connection established successfully
✓ Database synced
✓ Server is running on port 5000
✓ Environment: development
✓ API Documentation: http://localhost:5000/api
```

### Step 7: Test the API

Open your browser or Postman and visit:
```
http://localhost:5000/api
```

You should see:
```json
{
  "success": true,
  "message": "News Portal API is running",
  "version": "1.0.0"
}
```

## Test Login

### Using cURL:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'
```

### Using Postman:

1. Method: POST
2. URL: `http://localhost:5000/api/auth/login`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

You should receive a token in the response.

## Common Issues

### Issue: "Access denied for user"
**Solution**: Check your MySQL username and password in .env file

### Issue: "Database does not exist"
**Solution**: Run `CREATE DATABASE news_portal_db;` in MySQL

### Issue: "Sequelize CLI not found"
**Solution**: Install dependencies again: `npm install`

### Issue: "Port 5000 already in use"
**Solution**: Change PORT in .env file to another port (e.g., 5001)

## Database Reset

If you need to reset the database:

```bash
# This will undo all migrations, re-run them, and seed data
npm run db:reset
```

## Next Steps

1. Test all API endpoints using Postman or cURL
2. Integrate with frontend application
3. Update .env for production deployment

## Seeded Users

After running seeders, you can login with:

| Name | Email | Password |
|------|-------|----------|
| Alice Rahman | alice@example.com | password123 |
| Karim Hossain | karim@example.com | password123 |
| Nusrat Jahan | nusrat@example.com | password123 |

---

For detailed API documentation, see [README.md](README.md)
