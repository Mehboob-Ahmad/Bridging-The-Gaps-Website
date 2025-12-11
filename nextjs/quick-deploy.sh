#!/bin/bash
# Quick deployment script for your own hosting
# Run this on your server after uploading files

echo "🚀 Deploying Bridging the Gaps Next.js App..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build the application
echo "🔨 Building application..."
npm run build

# Set up PM2 (if not installed)
if ! command -v pm2 &> /dev/null
then
    echo "📥 Installing PM2..."
    npm install -g pm2
fi

# Stop existing instance if running
pm2 stop bridging-gaps 2>/dev/null
pm2 delete bridging-gaps 2>/dev/null

# Start the application
echo "▶️  Starting application..."
pm2 start npm --name "bridging-gaps" -- start

# Save PM2 configuration
pm2 save

echo "✅ Deployment complete!"
echo "📊 Check status: pm2 list"
echo "📝 View logs: pm2 logs bridging-gaps"
echo "🌐 Your app should be running on port 3001"

