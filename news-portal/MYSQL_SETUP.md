# Setting Up MySQL for News Portal Backend

## ⚠️ MySQL Not Found

The backend requires MySQL database to run. You need to install MySQL or XAMPP first.

## 📥 Installation Options

### Option 1: XAMPP (Recommended for Development - Easiest)

1. **Download XAMPP:**
   - Visit: https://www.apachefriends.org/download.html
   - Download XAMPP for Windows
   - Install XAMPP to default location (C:\xampp)

2. **Start MySQL:**
   - Open XAMPP Control Panel
   - Click "Start" button next to MySQL
   - MySQL should show green "Running" status

3. **Create Database:**
   - Click "Admin" button next to MySQL (opens phpMyAdmin)
   - Click "New" on left sidebar
   - Database name: `news_portal_db`
   - Collation: `utf8mb4_general_ci`
   - Click "Create"

4. **Update .env file (if needed):**
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=news_portal_db
   DB_USER=root
   DB_PASSWORD=
   ```

### Option 2: MySQL Server (Standalone)

1. **Download MySQL:**
   - Visit: https://dev.mysql.com/downloads/installer/
   - Download MySQL Installer for Windows
   - Choose "Developer Default" installation

2. **During Installation:**
   - Set root password (or leave empty for development)
   - Remember the password!
   - Use default port 3306

3. **Create Database:**
   ```bash
   # Open MySQL Command Line Client
   # Enter your password
   CREATE DATABASE news_portal_db;
   SHOW DATABASES;
   EXIT;
   ```

4. **Update .env file:**
   ```env
   DB_PASSWORD=your_mysql_password
   ```

## 🚀 After Installing MySQL

Once MySQL is installed and running:

### Step 1: Verify MySQL is Running
- **XAMPP**: Check XAMPP Control Panel, MySQL should be green
- **Standalone**: Open Task Manager, look for "mysqld.exe" process

### Step 2: Create Database
```powershell
# From project root
cd backend

# If using XAMPP
C:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS news_portal_db;"

# If using standalone MySQL
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS news_portal_db;"
# Enter your password when prompted
```

### Step 3: Run Migrations
```powershell
npm run db:migrate
```

Expected output:
```
== 20250101000001-create-users: migrating =======
== 20250101000001-create-users: migrated
== 20250101000002-create-news: migrating =======
== 20250101000002-create-news: migrated
== 20250101000003-create-comments: migrating =======
== 20250101000003-create-comments: migrated
```

### Step 4: Seed Database
```powershell
npm run db:seed
```

### Step 5: Start Server
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

## 🔧 Troubleshooting

### "MySQL not found" error
- Make sure MySQL is installed
- Add MySQL to PATH environment variable
- Or use full path: `C:\xampp\mysql\bin\mysql.exe`

### "Access denied" error
- Check DB_USER and DB_PASSWORD in .env file
- Default XAMPP password is empty
- Make sure you're using the correct MySQL root password

### "Can't connect to MySQL server"
- Start MySQL service
- XAMPP: Start from XAMPP Control Panel
- Standalone: Start MySQL service from Windows Services

### Port 3306 already in use
- Another MySQL instance is running
- Stop other MySQL services
- Or change DB_PORT in .env

## 📞 Need Help?

If you encounter issues:
1. Check MySQL/XAMPP is running
2. Verify database exists: `SHOW DATABASES;`
3. Test connection with MySQL Workbench or phpMyAdmin
4. Check .env configuration matches your MySQL setup

---

**Once MySQL is set up, run:** `npm run dev` from the backend folder! 🚀
