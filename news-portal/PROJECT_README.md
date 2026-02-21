# News Portal - Full Stack Application

A professional full-stack news portal application with Express.js backend and Vanilla JavaScript frontend, implementing modern web development best practices.

## 🎯 Project Overview

This project demonstrates a complete news portal system where users can:
- Register and login with JWT authentication
- Create, read, update, and delete news articles
- Add comments to news articles
- View user profiles and manage their own content

## 📁 Project Structure

```
news-portal/
├── backend/                    # Backend API (Express.js + Sequelize)
│   ├── config/                # Database and environment configuration
│   ├── controllers/           # Business logic (Auth, User, News, Comment)
│   ├── middleware/            # Auth, validation, error handling
│   ├── migrations/            # Database schema migrations
│   ├── models/                # Sequelize models (User, News, Comment)
│   ├── routes/                # API routes
│   ├── seeders/               # Database seeders
│   ├── validators/            # Request validation rules
│   ├── .env                   # Environment variables
│   ├── .env.example           # Environment template
│   ├── package.json           # Backend dependencies
│   ├── server.js              # Main server file
│   ├── README.md              # Backend documentation
│   ├── SETUP.md               # Setup guide
│   ├── ARCHITECTURE.md        # Architecture documentation
│   └── postman_collection.json # API testing collection
│
├── frontend/                   # Frontend files (currently in root)
│   ├── index.html             # Login page
│   ├── news-list.html         # News listing page
│   ├── news-detail.html       # News detail page
│   ├── create-news.html       # Create news page
│   ├── edit-news.html         # Edit news page
│   ├── login.js               # Login logic
│   ├── news-list.js           # News list logic
│   ├── news-detail.js         # News detail logic
│   ├── create-news.js         # Create news logic
│   ├── edit-news.js           # Edit news logic
│   ├── utils.js               # Utility functions
│   └── styles.css             # Styles
│
├── db.json                     # JSON Server data (legacy)
├── package.json               # Root package.json
└── README.md                  # This file
```

## 🚀 Features

### Backend Features

✅ **RESTful API Design** - Standard HTTP methods and resource-based URLs  
✅ **JWT Authentication** - Secure token-based authentication  
✅ **Database Migrations** - Version-controlled database schema  
✅ **ORM (Sequelize)** - Object-Relational Mapping with MySQL  
✅ **Request Validation** - Input validation with express-validator  
✅ **Error Handling** - Centralized error handling middleware  
✅ **Password Hashing** - Secure password storage with bcrypt  
✅ **CORS Support** - Cross-origin resource sharing enabled  
✅ **Environment Configuration** - .env file for sensitive data  
✅ **Database Seeders** - Populate initial/demo data  
✅ **Separation of Concerns** - MVC architecture  
✅ **Pagination** - Efficient data fetching  
✅ **API Documentation** - Comprehensive docs and Postman collection  

### Frontend Features

✅ **Vanilla JavaScript** - No framework dependencies  
✅ **Responsive Design** - Mobile-friendly interface  
✅ **User Authentication** - Login/logout functionality  
✅ **CRUD Operations** - Create, Read, Update, Delete news  
✅ **Comment System** - Add comments to news articles  
✅ **Local Storage** - Persist user session  
✅ **Dynamic Content** - Real-time UI updates  

## 🛠️ Technologies Used

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v4.18.2
- **Database**: MySQL
- **ORM**: Sequelize v6.35.2
- **Authentication**: JWT (jsonwebtoken v9.0.2)
- **Password Hashing**: bcryptjs v2.4.3
- **Validation**: express-validator v7.0.1
- **CORS**: cors v2.8.5
- **Environment**: dotenv v16.3.1

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling
- **Vanilla JavaScript** - ES6+ features
- **Fetch API** - HTTP requests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/)
- **npm** (comes with Node.js)

## ⚡ Quick Start

### Option 1: Using the Professional Backend (Recommended)

#### 1. Clone the Repository

```bash
cd "f:\books\5th sem\WebTecLab\news-portal"
```

#### 2. Install Backend Dependencies

```bash
npm run backend:install
```

#### 3. Configure Environment

```bash
cd backend
cp .env.example .env
# Edit .env file with your MySQL credentials
```

#### 4. Create Database

```bash
# Open MySQL command line
mysql -u root -p

# Create database
CREATE DATABASE news_portal_db;
EXIT;
```

#### 5. Run Migrations and Seeders

```bash
# From root directory
npm run backend:migrate
npm run backend:seed
```

#### 6. Start Backend Server

```bash
npm run backend:dev
```

The API will be running at `http://localhost:5000`

#### 7. Start Frontend

Open `index.html` in your browser using Live Server or any web server.

### Option 2: Using JSON Server (Legacy)

```bash
npm install
npm run dev
```

The JSON server will run at `http://localhost:3000`

## 📚 Documentation

Detailed documentation is available in the backend directory:

- **[Backend README](backend/README.md)** - Complete API documentation
- **[Setup Guide](backend/SETUP.md)** - Step-by-step setup instructions
- **[Architecture](backend/ARCHITECTURE.md)** - System architecture and best practices
- **[Postman Collection](backend/postman_collection.json)** - API testing collection

## 🔐 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (protected)

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user (protected)
- `DELETE /users/:id` - Delete user (protected)

### News
- `GET /news` - Get all news (with pagination)
- `GET /news/:id` - Get news by ID
- `POST /news` - Create news (protected)
- `PUT /news/:id` - Update news (protected)
- `DELETE /news/:id` - Delete news (protected)

### Comments
- `GET /comments/news/:newsId/comments` - Get comments for news
- `POST /comments/news/:newsId/comments` - Create comment (protected)
- `PUT /comments/:id` - Update comment (protected)
- `DELETE /comments/:id` - Delete comment (protected)

## 🧪 Testing

### Using Postman

1. Import the Postman collection from `backend/postman_collection.json`
2. Update the `baseUrl` variable to `http://localhost:5000`
3. Login to get a token
4. Set the `token` variable in Postman
5. Test protected endpoints

### Using cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'

# Get all news
curl http://localhost:5000/api/news

# Create news (replace YOUR_TOKEN)
curl -X POST http://localhost:5000/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test News","body":"This is a test news article."}'
```

## 👥 Demo Users

After running seeders, you can login with:

| Name | Email | Password |
|------|-------|----------|
| Alice Rahman | alice@example.com | password123 |
| Karim Hossain | karim@example.com | password123 |
| Nusrat Jahan | nusrat@example.com | password123 |

## 🗃️ Database Schema

```sql
users
├── id (PK)
├── name
├── email (UNIQUE)
├── password (HASHED)
├── createdAt
└── updatedAt

news
├── id (PK)
├── title
├── body
├── author_id (FK -> users.id)
├── createdAt
└── updatedAt

comments
├── id (PK)
├── text
├── user_id (FK -> users.id)
├── news_id (FK -> news.id)
├── createdAt
└── updatedAt
```

## 🎓 Best Practices Demonstrated

This project demonstrates the following web development best practices:

1. **Token-Based Authentication** - JWT for stateless auth
2. **Database Migrations** - Version control for schema
3. **ORM Usage** - Sequelize for database abstraction
4. **Environment Variables** - .env for configuration
5. **Database Seeders** - Consistent test data
6. **RESTful API Design** - Standard conventions
7. **Request Validation** - Input validation and sanitization
8. **Separation of Concerns** - MVC architecture
9. **Error Handling** - Centralized error management
10. **Security** - Password hashing, JWT, input validation
11. **Code Organization** - Clean folder structure
12. **Documentation** - Comprehensive docs and comments

## 📝 npm Scripts

### Root Directory
```bash
npm run backend:install  # Install backend dependencies
npm run backend:dev      # Start backend in dev mode
npm run backend:migrate  # Run database migrations
npm run backend:seed     # Seed database with demo data
npm run backend:reset    # Reset database (migrate + seed)
```

### Backend Directory
```bash
npm start               # Start production server
npm run dev            # Start development server (nodemon)
npm run db:migrate     # Run migrations
npm run db:seed        # Run seeders
npm run db:reset       # Reset database
```

## 🔧 Configuration

### Backend Configuration (.env)

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=news_portal_db
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=24h
CLIENT_URL=http://localhost:5500
```

## 🚨 Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists

### Migration Error
- Check database connection
- Verify migration files order
- Try `npm run backend:reset`

### Port Already in Use
- Change `PORT` in `.env`
- Kill process using the port

### Authentication Error
- Check `JWT_SECRET` is set
- Verify token format: `Bearer {token}`
- Check token expiration

## 📖 Learning Resources

This project covers concepts from:
- Web Technology Lab (5th Semester)
- RESTful API Development
- Database Design & ORM
- Authentication & Authorization
- Full Stack Development

## 🤝 Contributing

This is an educational project for Web Technology Lab. Feel free to:
- Report bugs
- Suggest improvements
- Add new features
- Improve documentation

## 📄 License

ISC License

## 👨‍💻 Author

Web Technology Lab - 5th Semester

---

## 🎯 Next Steps

After setting up the project:

1. ✅ Start the backend server
2. ✅ Open the frontend in a browser
3. ✅ Login with demo credentials
4. ✅ Explore CRUD operations
5. ✅ Test API with Postman
6. ✅ Read the documentation
7. ✅ Understand the architecture
8. ✅ Modify and experiment

**Happy Coding! 🚀**
