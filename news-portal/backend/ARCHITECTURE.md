# News Portal Backend - Architecture & Best Practices

## Architecture Overview

This backend follows the **MVC (Model-View-Controller)** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                              │
│                    (Frontend/Postman)                       │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP Requests
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                      MIDDLEWARE LAYER                        │
│  ┌──────────┐  ┌──────────┐  ┌────────────────┐           │
│  │   CORS   │→│   JSON   │→│  Request Logger  │           │
│  └──────────┘  └──────────┘  └────────────────┘           │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                       ROUTES LAYER                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   Auth   │  │  Users   │  │   News   │  │ Comments │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   VALIDATION LAYER                          │
│              (express-validator)                            │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 AUTHENTICATION LAYER                        │
│                    (JWT Middleware)                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   CONTROLLER LAYER                          │
│                  (Business Logic)                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │AuthController│ │UserController│ │NewsController│        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                      MODEL LAYER                            │
│                    (Sequelize ORM)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │   User   │  │   News   │  │ Comment  │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATABASE LAYER                          │
│                    (MySQL Database)                         │
└─────────────────────────────────────────────────────────────┘
```

## Best Practices Implemented

### 1. **Token-Based Authentication (JWT)**

**Implementation:**
- User logs in with email/password
- Server validates credentials and generates JWT token
- Token contains user ID and expiration time
- Client includes token in `Authorization` header for protected routes
- Server verifies token before processing requests

**Files:**
- `controllers/authController.js` - Login/Register logic
- `middleware/auth.js` - JWT verification middleware

**Benefits:**
- Stateless authentication
- Scalable (no server-side sessions)
- Secure token-based access

### 2. **Database Migrations**

**Implementation:**
- Version-controlled database schema changes
- Sequential migration files with timestamps
- Up/Down migration support for rollbacks
- Consistent schema across environments

**Files:**
- `migrations/20250101000001-create-users.js`
- `migrations/20250101000002-create-news.js`
- `migrations/20250101000003-create-comments.js`

**Commands:**
```bash
npm run db:migrate        # Run migrations
npm run db:migrate:undo   # Rollback last migration
```

**Benefits:**
- Version control for database schema
- Easy rollback on errors
- Team collaboration on schema changes

### 3. **ORM (Sequelize)**

**Implementation:**
- Object-Relational Mapping for database operations
- Model definitions with validation
- Associations (hasMany, belongsTo)
- Query builder for complex queries

**Files:**
- `models/User.js` - User model with password hashing
- `models/News.js` - News model
- `models/Comment.js` - Comment model
- `models/index.js` - Model associations

**Benefits:**
- SQL injection prevention
- Database abstraction
- Easy to switch databases
- Type safety and validation

### 4. **Environment Variables (.env)**

**Implementation:**
- Sensitive configuration in .env file
- Different configs for dev/test/production
- .env file NOT committed to git
- .env.example provided as template

**Files:**
- `.env` - Actual configuration (gitignored)
- `.env.example` - Template for team members

**Variables:**
- Database credentials
- JWT secret
- Port configuration
- CORS settings

**Benefits:**
- Security (no hardcoded credentials)
- Easy environment switching
- Configuration flexibility

### 5. **Seeders**

**Implementation:**
- Populate database with initial/demo data
- Consistent test data across environments
- Easy database reset for development

**Files:**
- `seeders/20250101000001-demo-users.js`
- `seeders/20250101000002-demo-news.js`
- `seeders/20250101000003-demo-comments.js`

**Commands:**
```bash
npm run db:seed         # Run all seeders
npm run db:seed:undo    # Undo all seeders
npm run db:reset        # Reset and seed database
```

**Benefits:**
- Quick setup for new developers
- Consistent test data
- Easy database reset

### 6. **RESTful API Design**

**Implementation:**
- Resource-based URLs
- Standard HTTP methods (GET, POST, PUT, DELETE)
- Proper HTTP status codes
- Consistent response format

**Examples:**
```
GET    /api/news          - Get all news
GET    /api/news/:id      - Get specific news
POST   /api/news          - Create news
PUT    /api/news/:id      - Update news
DELETE /api/news/:id      - Delete news
```

**Response Format:**
```json
{
  "success": true/false,
  "message": "Description",
  "data": { ... }
}
```

**Benefits:**
- Intuitive API structure
- Standard conventions
- Easy to understand and use

### 7. **Request Validation**

**Implementation:**
- Input validation using express-validator
- Sanitization of user inputs
- Custom validation rules
- Detailed error messages

**Files:**
- `validators/authValidator.js`
- `validators/newsValidator.js`
- `validators/commentValidator.js`
- `middleware/validate.js`

**Example:**
```javascript
body('email')
  .trim()
  .notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Must be a valid email')
```

**Benefits:**
- Data integrity
- Security (XSS, injection prevention)
- User-friendly error messages

### 8. **Separation of Concerns**

**Implementation:**

**Routes** - Define endpoints and HTTP methods
```javascript
router.post('/login', validation, controller.login);
```

**Controllers** - Business logic and request handling
```javascript
exports.login = async (req, res, next) => { ... }
```

**Models** - Data structure and database operations
```javascript
const User = sequelize.define('User', { ... });
```

**Middleware** - Cross-cutting concerns (auth, validation, errors)
```javascript
const authMiddleware = async (req, res, next) => { ... }
```

**Benefits:**
- Code organization
- Maintainability
- Testability
- Reusability

## Security Features

### 1. Password Security
- Passwords hashed with bcrypt (10 salt rounds)
- Never stored or returned in plain text
- Automatic hashing on create/update

### 2. JWT Security
- Tokens signed with secret key
- Expiration time enforced
- Verified on each protected request

### 3. Input Validation
- All inputs validated and sanitized
- SQL injection prevention via ORM
- XSS prevention via sanitization

### 4. CORS Configuration
- Configurable allowed origins
- Credential support
- Method restrictions

### 5. Error Handling
- No sensitive data in error messages
- Centralized error handling
- Proper HTTP status codes

## Database Relationships

```
┌─────────────┐
│    Users    │
│             │
│ - id (PK)   │
│ - name      │
│ - email     │
│ - password  │
└──────┬──────┘
       │
       │ 1:N (author)
       │
       ▼
┌─────────────┐
│    News     │
│             │
│ - id (PK)   │
│ - title     │
│ - body      │
│ - author_id │◄───┐
└──────┬──────┘    │
       │           │
       │ 1:N       │ N:1
       │           │
       ▼           │
┌─────────────┐    │
│  Comments   │    │
│             │    │
│ - id (PK)   │    │
│ - text      │    │
│ - user_id   │────┘
│ - news_id   │
└─────────────┘
```

## API Response Standards

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Pagination Response
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "totalPages": 5,
  "currentPage": 1,
  "data": { ... }
}
```

## Middleware Stack

1. **CORS** - Enable cross-origin requests
2. **Body Parser** - Parse JSON and URL-encoded data
3. **Request Logger** - Log incoming requests (dev only)
4. **Route Validation** - Validate request data
5. **Authentication** - Verify JWT token (protected routes)
6. **Controller** - Execute business logic
7. **Error Handler** - Catch and format errors

## Code Quality Standards

### Naming Conventions
- **Files**: camelCase (e.g., `authController.js`)
- **Variables**: camelCase (e.g., `userName`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `JWT_SECRET`)
- **Classes/Models**: PascalCase (e.g., `User`, `News`)

### Code Organization
- One model per file
- One controller per resource
- Related routes grouped together
- Shared logic in middleware

### Comments
- JSDoc for functions
- Inline comments for complex logic
- Route descriptions in controllers

### Error Handling
- Try-catch in async functions
- Pass errors to next() middleware
- Centralized error formatting

## Performance Optimizations

1. **Database Indexes** - On foreign keys and frequently queried fields
2. **Pagination** - Limit results with page/limit parameters
3. **Connection Pooling** - Sequelize connection pool configured
4. **Selective Queries** - Only fetch needed fields and associations
5. **Caching Ready** - Stateless design supports Redis caching

## Testing Strategy

### Manual Testing
- Postman collection provided
- cURL examples in documentation
- Seeded test data available

### Future Enhancements
- Unit tests (Jest/Mocha)
- Integration tests
- API documentation (Swagger)
- Rate limiting
- Redis caching
- File upload support

## Deployment Considerations

### Environment Setup
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Configure database credentials
- Set proper CORS origins

### Database
- Run migrations on deployment
- Don't run seeders in production
- Set up database backups
- Configure connection pooling

### Security
- Use HTTPS in production
- Enable rate limiting
- Set up monitoring and logging
- Regular dependency updates

---

This architecture ensures maintainability, scalability, and follows industry best practices for Node.js/Express backend development.
