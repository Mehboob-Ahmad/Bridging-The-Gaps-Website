# Node.js Installation & Setup Guide

## Step 1: Download Node.js

1. The Node.js website should have opened in your browser. If not, go to: **https://nodejs.org/**
2. Download the **LTS (Long Term Support)** version (recommended)
   - It will be a file like `node-v20.x.x-x64.msi` for Windows
3. Run the installer (.msi file)
4. Follow the installation wizard:
   - Accept the license agreement
   - Choose installation location (default is fine)
   - **IMPORTANT**: Make sure "Add to PATH" is checked (it should be by default)
   - Click "Install"
5. Complete the installation

## Step 2: Verify Installation

After installation, **close and reopen** your terminal/PowerShell, then run:

```powershell
node --version
npm --version
```

You should see version numbers (e.g., `v20.11.0` and `10.2.4`)

## Step 3: Install Next.js Dependencies

Once Node.js is installed, navigate to the nextjs folder and install dependencies:

```powershell
cd nextjs
npm install
```

This will install all required packages (Next.js, React, etc.)

## Step 4: Run the Development Server

To preview your site locally:

```powershell
npm run dev
```

Then open **http://localhost:3001** in your browser

## Step 5: Build for Production

To create a production build:

```powershell
npm run build
npm run start
```

## Troubleshooting

- If `node` or `npm` commands don't work after installation:
  - Close and reopen your terminal/PowerShell
  - Restart your computer if needed
  - Check that Node.js was added to PATH during installation

- If you get permission errors:
  - Run PowerShell as Administrator
  - Or use a different terminal (like Command Prompt)

## Environment Variables (Optional)

If you need database features, create a `.env.local` file in the `nextjs` folder:

```
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DB=bridging_the_gaps
MYSQL_USER=root
MYSQL_PASS=your_password
JWT_SECRET=your-secret-key-change-this
```

