# 🚀 Deploying to Your Own Domain & Hosting

## ✅ Yes, it will work perfectly! Here's how:

Your Next.js site can work on your own hosting, but you need to ensure your hosting supports **Node.js**. Here are the options:

---

## 📋 Hosting Requirements

### Required:
- ✅ **Node.js 18+** installed on server
- ✅ **npm** or **yarn** package manager
- ✅ **MySQL database** (if using database features)
- ✅ **PM2** or similar process manager (recommended)

### Optional but Recommended:
- ✅ **Nginx** or **Apache** as reverse proxy
- ✅ **SSL certificate** (HTTPS)
- ✅ **Domain** configured with DNS

---

## 🎯 Deployment Options

### Option 1: Traditional VPS/Server (Full Control) ⭐ Recommended

If you have a VPS, dedicated server, or cloud server (AWS, DigitalOcean, etc.):

#### Step 1: Upload Your Files

```bash
# Upload the entire 'nextjs' folder to your server
# You can use FTP, SFTP, or Git
```

#### Step 2: Install Dependencies

```bash
cd /path/to/your/nextjs
npm install --production
```

#### Step 3: Build the Site

```bash
npm run build
```

#### Step 4: Set Environment Variables

Create `.env.local` file:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=bridging_the_gaps
MYSQL_USER=your_db_user
MYSQL_PASS=your_db_password
JWT_SECRET=your-secret-key-min-32-characters
SITE_URL=https://yourdomain.com
NODE_ENV=production
```

#### Step 5: Set Up Database

```bash
# Connect to MySQL and run:
mysql -u root -p bridging_the_gaps < db.sql
```

#### Step 6: Start the Server

**Using PM2 (Recommended):**

```bash
# Install PM2 globally
npm install -g pm2

# Start your Next.js app
pm2 start npm --name "bridging-gaps" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on server reboot
pm2 startup
```

**Or using systemd:**

Create `/etc/systemd/system/bridging-gaps.service`:

```ini
[Unit]
Description=Bridging the Gaps Next.js App
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/path/to/your/nextjs
Environment=NODE_ENV=production
ExecStart=/usr/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl enable bridging-gaps
sudo systemctl start bridging-gaps
```

#### Step 7: Configure Nginx Reverse Proxy

Create `/etc/nginx/sites-available/bridging-gaps`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect to HTTPS (if you have SSL)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/bridging-gaps /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Option 2: Shared Hosting with Node.js Support

If your hosting provider supports Node.js (like cPanel with Node.js, Hostinger, etc.):

#### Step 1: Upload Files via cPanel File Manager or FTP

Upload the entire `nextjs` folder to your hosting account.

#### Step 2: Install via Terminal/SSH

```bash
cd ~/public_html/nextjs  # or wherever you uploaded it
npm install --production
npm run build
```

#### Step 3: Configure Environment Variables

In cPanel, go to **Node.js** section and:
- Set `NODE_ENV=production`
- Add your database credentials
- Set `JWT_SECRET`
- Set `SITE_URL`

#### Step 4: Start Application

In cPanel Node.js section:
- Select your app
- Click "Start App"
- Set port to `3001` (or your preferred port)

#### Step 5: Point Domain

Configure your domain to point to the Node.js application port.

---

### Option 3: Deploy to Vercel/Netlify & Point Domain (Easiest) ⭐⭐⭐

If your hosting doesn't support Node.js, use this method:

1. **Deploy to Vercel** (free):
   - Push code to GitHub
   - Go to vercel.com
   - Import repository
   - Deploy automatically

2. **Point Your Domain**:
   - In Vercel dashboard → Settings → Domains
   - Add your domain
   - Update DNS records as instructed
   - Vercel handles SSL automatically

**Benefits:**
- ✅ Free hosting
- ✅ Automatic SSL
- ✅ CDN included
- ✅ Easy updates
- ✅ Uses your own domain

---

## 🔧 Configuration for Your Domain

### Update Next.js Config

Edit `nextjs/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For easier deployment
  // If using a subdomain or subdirectory:
  // basePath: '/subdirectory', // if deploying to /subdirectory
  // assetPrefix: 'https://cdn.yourdomain.com', // if using CDN
}

module.exports = nextConfig
```

### Update Package.json Scripts

If your hosting uses a different port, update `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001"  // Change port if needed
  }
}
```

---

## 📝 Pre-Deployment Checklist

- [ ] Node.js 18+ installed on server
- [ ] Database created and `db.sql` executed
- [ ] Environment variables configured
- [ ] `npm install` completed
- [ ] `npm run build` successful
- [ ] Process manager (PM2) configured
- [ ] Reverse proxy (Nginx/Apache) configured
- [ ] Domain DNS records updated
- [ ] SSL certificate installed (for HTTPS)
- [ ] Firewall allows port 3001 (or your chosen port)

---

## 🧪 Testing After Deployment

1. **Check if site loads**: `https://yourdomain.com`
2. **Test pages**: Navigate through all pages
3. **Test database**: Try login/signup
4. **Test admin**: Access `/admin` page
5. **Check console**: Look for errors in browser console

---

## 🔍 Troubleshooting

### Site shows "Cannot GET /"
- Check if Node.js app is running: `pm2 list` or `systemctl status bridging-gaps`
- Verify port is correct in reverse proxy config
- Check firewall settings

### Database connection errors
- Verify MySQL is running
- Check database credentials in `.env.local`
- Ensure database exists and tables are created

### 500 Internal Server Error
- Check server logs: `pm2 logs` or `journalctl -u bridging-gaps`
- Verify all environment variables are set
- Check file permissions

### Port already in use
- Change port in `package.json` scripts
- Update reverse proxy configuration
- Or kill the process using the port

---

## 📞 Need Help?

Common hosting providers and their Node.js support:

- **cPanel with Node.js**: ✅ Supported
- **Plesk**: ✅ Supported
- **DigitalOcean**: ✅ Full support
- **AWS EC2**: ✅ Full support
- **Hostinger**: ✅ Node.js available
- **Bluehost**: ⚠️ Limited (may need VPS)
- **GoDaddy**: ⚠️ Limited (may need VPS)

**If your hosting doesn't support Node.js**, use **Option 3** (Vercel/Netlify) - it's free and works perfectly with your domain!

---

## ✅ Final Steps

Once deployed:

1. Test all functionality
2. Set up automatic backups
3. Monitor server resources
4. Set up error tracking (optional)
5. Configure analytics (optional)

**Your site will work perfectly on your hosting as long as it supports Node.js!** 🚀

