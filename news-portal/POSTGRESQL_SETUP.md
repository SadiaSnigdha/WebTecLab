# Setting Up PostgreSQL for News Portal Backend

## 📥 Installing PostgreSQL

### Option 1: PostgreSQL Installer (Recommended)

1. **Download PostgreSQL:**
   - Visit: https://www.postgresql.org/download/windows/
   - Download Windows installer (Latest version 15 or 16)
   - File size: ~300MB

2. **Install PostgreSQL:**
   - Run the installer
   - **Password**: Set a password for postgres user (remember this!)
   - **Port**: Keep default 5432
   - **Locale**: Keep default
   - Click through the installation
   - Uncheck "Stack Builder" at the end (not needed)

3. **Verify Installation:**
   ```powershell
   # Open PowerShell
   psql --version
   # Should show: psql (PostgreSQL) 15.x or 16.x
   ```

### Option 2: Using pgAdmin (GUI Tool - Comes with PostgreSQL)

After installing PostgreSQL, pgAdmin is automatically installed.

## 🗄️ Create Database

### Method 1: Using Command Line

```powershell
# Connect to PostgreSQL
psql -U postgres

# You'll be prompted for password (the one you set during installation)

# Create database
CREATE DATABASE news_portal_db;

# Verify database was created
\l

# Exit
\q
```

### Method 2: Using pgAdmin (GUI)

1. Open **pgAdmin 4** from Start menu
2. Enter master password (if prompted)
3. Expand **Servers** → **PostgreSQL 15/16**
4. Enter your postgres password
5. Right-click **Databases** → **Create** → **Database**
6. Database name: `news_portal_db`
7. Click **Save**

## ⚙️ Configure Backend

The `.env` file is already configured for PostgreSQL:

```env
# Database Configuration (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=news_portal_db
DB_USER=postgres
DB_PASSWORD=postgres    # Change this to your password!
```

**Important:** Update `DB_PASSWORD` with the password you set during PostgreSQL installation!

## 🚀 Run the Backend

### Step 1: Install Dependencies

```powershell
cd "F:\books\5th sem\WebTecLab\news-portal\backend"
npm install
```

This will install:
- `pg` - PostgreSQL client
- `pg-hstore` - PostgreSQL data serialization

### Step 2: Run Migrations

```powershell
npm run db:migrate
```

Expected output:
```
Sequelize CLI [Node: 24.x, CLI: 6.6.5, ORM: 6.37.7]

Loaded configuration file "config\database.js".
Using environment "development".

== 20250101000001-create-users: migrating =======
== 20250101000001-create-users: migrated (0.156s)

== 20250101000002-create-news: migrating =======
== 20250101000002-create-news: migrated (0.089s)

== 20250101000003-create-comments: migrating =======
== 20250101000003-create-comments: migrated (0.078s)
```

### Step 3: Seed Database

```powershell
npm run db:seed
```

Expected output:
```
Sequelize CLI [Node: 24.x, CLI: 6.6.5, ORM: 6.37.7]

Loaded configuration file "config\database.js".
Using environment "development".

== 20250101000001-demo-users: migrating =======
== 20250101000001-demo-users: migrated (0.234s)

== 20250101000002-demo-news: migrating =======
== 20250101000002-demo-news: migrated (0.123s)

== 20250101000003-demo-comments: migrating =======
== 20250101000003-demo-comments: migrated (0.098s)
```

### Step 4: Start Server

```powershell
npm run dev
```

You should see:
```
✓ Database connection established successfully
✓ Database synced
✓ Server is running on port 5000
✓ Environment: development
✓ API Documentation: http://localhost:5000/api
```

## 🧪 Test the API

Open browser and visit:
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

## 🔍 Verify Database

### Using pgAdmin:

1. Open pgAdmin 4
2. Navigate to: Servers → PostgreSQL → Databases → news_portal_db → Schemas → public → Tables
3. You should see 4 tables:
   - `users`
   - `news`
   - `comments`
   - `SequelizeMeta` (migration tracking)

### Using Command Line:

```powershell
# Connect to database
psql -U postgres -d news_portal_db

# List all tables
\dt

# View users
SELECT * FROM users;

# View news
SELECT * FROM news;

# View comments
SELECT * FROM comments;

# Exit
\q
```

## 🔧 Troubleshooting

### "psql: command not found"

**Solution:** Add PostgreSQL to PATH

1. Find PostgreSQL bin folder: `C:\Program Files\PostgreSQL\15\bin`
2. Add to System PATH:
   - Right-click "This PC" → Properties
   - Advanced system settings → Environment Variables
   - Under System Variables, select "Path" → Edit
   - Click "New" and add: `C:\Program Files\PostgreSQL\15\bin`
   - Click OK, restart PowerShell

### "password authentication failed"

**Solution:** Check your password

- The password in `.env` file must match the password you set during installation
- Default username is `postgres`
- Update `DB_PASSWORD` in `.env` file

### "database does not exist"

**Solution:** Create the database

```powershell
psql -U postgres
CREATE DATABASE news_portal_db;
\q
```

### Port 5432 already in use

**Solution:** Another PostgreSQL instance is running

- Check Windows Services for PostgreSQL
- Or change `DB_PORT` in `.env` to another port

### Connection refused

**Solution:** PostgreSQL service not running

1. Open Services (Win + R → `services.msc`)
2. Find "postgresql-x64-15" or similar
3. Right-click → Start

## 📊 PostgreSQL vs MySQL

Benefits of using PostgreSQL:
- ✅ More advanced features (JSON, Arrays, Full-text search)
- ✅ Better standards compliance
- ✅ Strong data integrity
- ✅ Open-source with no licensing concerns
- ✅ Better performance for complex queries
- ✅ Excellent concurrent read/write handling

## 🎯 Quick Commands Reference

```powershell
# Connect to PostgreSQL
psql -U postgres

# Connect to specific database
psql -U postgres -d news_portal_db

# Create database
CREATE DATABASE news_portal_db;

# List databases
\l

# List tables
\dt

# Describe table
\d users

# Run SQL query
SELECT * FROM users;

# Exit
\q
```

## 📱 GUI Tools for PostgreSQL

- **pgAdmin 4** (Included with PostgreSQL) - Most popular
- **DBeaver** - Universal database tool
- **DataGrip** - JetBrains IDE (Paid)
- **TablePlus** - Modern GUI (Freemium)

## 🎓 Demo Users (After Seeding)

| Name | Email | Password |
|------|-------|----------|
| Alice Rahman | alice@example.com | password123 |
| Karim Hossain | karim@example.com | password123 |
| Nusrat Jahan | nusrat@example.com | password123 |

---

**Ready to go! Your PostgreSQL backend is now set up! 🚀**

For API documentation, see [README.md](README.md)
