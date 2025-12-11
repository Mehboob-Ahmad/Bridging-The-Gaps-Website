# Next.js Setup Script for Windows
# This script will install Next.js and all dependencies

Write-Host "=== Next.js Setup Script ===" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
    Write-Host "✓ npm found: $npmVersion" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js first:" -ForegroundColor Yellow
    Write-Host "1. Go to https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "2. Download and install the LTS version" -ForegroundColor Yellow
    Write-Host "3. Restart your terminal and run this script again" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Opening Node.js download page..." -ForegroundColor Yellow
    Start-Process "https://nodejs.org/"
    exit 1
}

# Navigate to nextjs directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Installing Next.js and dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
Write-Host ""

# Install dependencies
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Next.js setup complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "To start the development server, run:" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "Then open http://localhost:3001 in your browser" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To build for production, run:" -ForegroundColor Cyan
    Write-Host "  npm run build" -ForegroundColor White
    Write-Host "  npm run start" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "✗ Installation failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}

