# Quick Start Guide - Next.js Setup

## Option 1: Automatic Setup (Recommended)

1. **First, install Node.js** (if not already installed):
   - Go to https://nodejs.org/
   - Download and install the **LTS version**
   - Restart your terminal after installation

2. **Run the setup script**:
   ```powershell
   cd nextjs
   .\setup-nextjs.ps1
   ```

   This will automatically:
   - Check if Node.js is installed
   - Install all Next.js dependencies
   - Set up your project

## Option 2: Manual Setup

If you prefer to do it manually:

1. **Install Node.js** from https://nodejs.org/ (LTS version)

2. **Open PowerShell** in the `nextjs` folder

3. **Install dependencies**:
   ```powershell
   npm install
   ```

4. **Start development server**:
   ```powershell
   npm run dev
   ```

5. **Open your browser** to: http://localhost:3001

## What Gets Installed?

The setup will download and install:
- Next.js framework
- React
- All required dependencies (see `package.json`)

## After Setup

Once everything is installed, you can:

- **Develop**: `npm run dev` - Start development server
- **Build**: `npm run build` - Create production build
- **Deploy**: Your site is ready to host on Vercel, Netlify, or any Node.js hosting!

## Troubleshooting

**"npm is not recognized"**
- Node.js is not installed or not in PATH
- Restart your terminal after installing Node.js
- Restart your computer if needed

**Permission errors**
- Run PowerShell as Administrator
- Or use Command Prompt instead

**Port 3001 already in use**
- Change the port in `package.json` scripts
- Or stop the other application using port 3001

