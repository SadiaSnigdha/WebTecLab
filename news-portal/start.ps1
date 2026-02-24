if (-not (Test-Path "backend\node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    cd backend
    npm install
    cd ..
}

# Start Backend Server
Write-Host "Starting Backend Server on port 5000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm start"

# Wait for backend to start
Start-Sleep -Seconds 3

# Start Frontend Server
Write-Host "Starting Frontend Server on port 3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; python -m http.server 3000"

# Wait a bit
Start-Sleep -Seconds 2

Write-Host "Backend API:  http://localhost:5000/api" -ForegroundColor Yellow
Write-Host "Frontend:     http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Green
Start-Sleep -Seconds 3
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "Press any key to exit (servers will keep running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
