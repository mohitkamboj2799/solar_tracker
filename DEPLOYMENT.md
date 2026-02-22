# 🚀 Deployment Guide - PM Surya Ghar Tracker

## Table of Contents
1. [Local Deployment](#local-deployment)
2. [Docker Deployment](#docker-deployment)
3. [Cloud Deployment](#cloud-deployment)
4. [Production Setup](#production-setup)
5. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Local Deployment

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- 100MB free disk space

### Installation Steps

```bash
# 1. Clone/Download project
cd /path/to/solar_tracker

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your settings

# 4. Start server
npm start

# 5. Access application
# Open http://localhost:3000 in browser
```

### Verify Installation
```bash
# Test API endpoint
curl http://localhost:3000/api/vendors

# Should return vendor data in JSON format
```

---

## Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose (optional)
- 500MB disk space

### Quick Start with Docker Compose

```bash
# 1. Navigate to project directory
cd /workspaces/solar_tracker

# 2. Build and start containers
docker-compose up

# 3. Access application
# http://localhost:3000
```

### Manual Docker Deployment

```bash
# 1. Build Docker image
docker build -t surya-ghar-tracker:1.0 .

# 2. Run container
docker run -d \
  --name surya-tracker \
  -p 3000:3000 \
  -e PORT=3000 \
  -e API_KEY=surya-ghar-2024 \
  -e NODE_ENV=production \
  surya-ghar-tracker:1.0

# 3. Verify container is running
docker ps

# 4. View logs
docker logs surya-tracker

# 5. Stop container
docker stop surya-tracker

# 6. Remove container
docker rm surya-tracker
```

### Docker Advanced Usage

**Push to Docker Hub:**
```bash
docker tag surya-ghar-tracker:1.0 username/surya-ghar-tracker:1.0
docker push username/surya-ghar-tracker:1.0
```

**Use environment file:**
```bash
docker run -d --env-file .env -p 3000:3000 surya-ghar-tracker:1.0
```

**Mount volume for data persistence:**
```bash
docker run -d \
  -v /path/to/data:/app/data \
  -p 3000:3000 \
  surya-ghar-tracker:1.0
```

---

## Cloud Deployment

### Heroku Deployment

**Prerequisites:**
- Heroku account
- Heroku CLI installed

**Steps:**

```bash
# 1. Login to Heroku
heroku login

# 2. Create Heroku app
heroku create surya-ghar-tracker

# 3. Set environment variables
heroku config:set API_KEY=your-secret-key
heroku config:set NODE_ENV=production

# 4. Deploy application
git push heroku main

# 5. View logs
heroku logs --tail

# 6. Open application
heroku open
```

### AWS EC2 Deployment

**Prerequisites:**
- AWS Account
- EC2 instance (Ubuntu 20.04 or 22.04)
- Security group allows port 3000

**Steps:**

```bash
# 1. SSH into EC2 instance
ssh -i "key.pem" ec2-user@your-instance-ip

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clone repository
git clone https://github.com/your-repo/solar_tracker.git
cd solar_tracker

# 4. Install dependencies
npm install --production

# 5. Create .env file
cat > .env << EOF
PORT=3000
API_KEY=your-secret-key
NODE_ENV=production
EOF

# 6. Install PM2 for process management
sudo npm install -g pm2

# 7. Start application
pm2 start server.js --name "surya-tracker"
pm2 save
pm2 startup

# 8. Configure Nginx reverse proxy (optional)
sudo apt-get install nginx
# ... configure nginx config

# 9. Start Nginx
sudo systemctl start nginx
```

### Google Cloud App Engine

**Prerequisites:**
- Google Cloud Account
- gcloud CLI installed

**Steps:**

```bash
# 1. Initialize gcloud
gcloud init

# 2. Create app.yaml
cat > app.yaml << EOF
runtime: nodejs16

env: standard

entrypoint: npm start

env_variables:
  API_KEY: "your-secret-key"
  NODE_ENV: "production"
EOF

# 3. Deploy
gcloud app deploy

# 4. View application
gcloud app browse
```

### DigitalOcean App Platform

**Via Web Console:**
1. Connect GitHub repository
2. Select deployment branch
3. Set environment variables
4. Configure build command: `npm install`
5. Configure run command: `npm start`
6. Set port: 3000
7. Deploy

---

## Production Setup

### Security Configuration

**1. Environment Variables**
```env
PORT=3000
API_KEY=generate-strong-random-key-here
NODE_ENV=production
DB_PASSWORD=use-strong-password
```

**2. Enable HTTPS**
```bash
# Using Let's Encrypt with Certbot
sudo certbot certonly --standalone -d your-domain.com

# Configure in reverse proxy (Nginx/Apache)
```

**3. Firewall Rules**
```bash
# Allow only necessary ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

### Database Integration

Replace in-memory store with PostgreSQL:

```bash
npm install pg
```

**Update server.js:**
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});
```

### Reverse Proxy Setup (Nginx)

**Create /etc/nginx/sites-available/surya-tracker**
```nginx
upstream surya_app {
  server localhost:3000;
}

server {
  listen 80;
  listen [::]:80;
  
  server_name your-domain.com;
  
  location / {
    proxy_pass http://surya_app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

**Enable:**
```bash
sudo ln -s /etc/nginx/sites-available/surya-tracker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Monitoring & Maintenance

### Process Management with PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start server.js --name "surya-tracker"

# Monitor
pm2 monit

# View logs
pm2 logs

# Restart
pm2 restart surya-tracker

# Stop
pm2 stop surya-tracker

# Delete
pm2 delete surya-tracker

# Auto-start on reboot
pm2 startup
pm2 save
```

### Logging Setup

**Using Winston:**
```bash
npm install winston
```

**Update server.js:**
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Monitoring Tools

- **PM2 Plus**: https://pm2.io/
- **New Relic**: https://newrelic.com/
- **Datadog**: https://www.datadoghq.com/
- **Sentry**: https://sentry.io/

---

## Backup & Disaster Recovery

### Backup Strategy

```bash
# Daily backup script
#!/bin/bash
BACKUP_DIR="/backups/surya_tracker"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup database
pg_dump surya_ghar > "$BACKUP_DIR/db_$DATE.sql"

# Backup application
tar -czf "$BACKUP_DIR/app_$DATE.tar.gz" /app

# Upload to S3
aws s3 cp "$BACKUP_DIR/" s3://bucket/backups/ --recursive
```

### Database Backup (PostgreSQL)

```bash
# Complete backup
pg_dump surya_ghar > backup.sql

# Restore
psql surya_ghar < backup.sql

# Automated daily backup
0 2 * * * pg_dump surya_ghar > /backups/$(date +\%Y\%m\%d).sql
```

---

## Performance Optimization

### Caching
```javascript
const redis = require('redis');
const client = redis.createClient();

// Cache vendor data for 5 minutes
app.get('/api/vendors', async (req, res) => {
  const cacheKey = 'vendors:all';
  const cached = await client.get(cacheKey);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  const data = fetchFromDB();
  await client.setEx(cacheKey, 300, JSON.stringify(data));
  res.json(data);
});
```

### Load Balancing

**Using Nginx:**
```nginx
upstream backends {
  server backend1.example.com:3000;
  server backend2.example.com:3000;
  server backend3.example.com:3000;
}

server {
  listen 80;
  
  location / {
    proxy_pass http://backends;
  }
}
```

---

## Health Checks

**Add Health Endpoint:**
```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});
```

**Test:**
```bash
curl http://localhost:3000/health
```

---

## Troubleshooting Deployment

| Issue | Solution |
|-------|----------|
| Port already in use | Change PORT in .env |
| Cannot connect to database | Verify DB credentials in .env |
| High memory usage | Check for memory leaks, enable caching |
| Slow response times | Add caching, optimize queries |
| Server crashes frequently | Check logs, increase memory allocation |
| CORS errors | Verify CORS configuration |

---

## Version Management

### Update Node.js
```bash
# Using NVM (recommended)
nvm install 16
nvm use 16

# Or update system Node
sudo apt-get update
sudo apt-get upgrade nodejs
```

### Update Dependencies
```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package@latest
```

---

## Cost Optimization

### Choosing Hosting
| Provider | Cost | Best For |
|----------|------|----------|
| Heroku | $7-50/month | Small projects, quick deployment |
| AWS | Pay-as-you-go | Scalable, complex apps |
| DigitalOcean | $5-40/month | Performance, simple deployment |
| Google Cloud | Pay-as-you-go | Advanced features |
| Linode | $5-40/month | Affordable, reliable |

### Cost-Saving Tips
- Use smallest instance size that works
- Enable auto-scaling
- Use CDN for static assets
- Optimize database queries
- Remove unused resources regularly

---

## Next Steps

1. ✅ Choose deployment platform
2. ✅ Configure production environment
3. ✅ Set up monitoring
4. ✅ Configure backups
5. ✅ Set up SSL/HTTPS
6. ✅ Test load handling
7. ✅ Document deployment process
8. ✅ Create disaster recovery plan

---

**Deployment Guide Complete!**

*For questions or issues, refer to README.md or IMPLEMENTATION_SUMMARY.md*
