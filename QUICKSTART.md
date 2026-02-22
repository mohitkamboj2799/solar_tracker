# 🚀 Quick Start Guide - PM Surya Ghar Tracker v2

## 1️⃣ Initial Setup (One-time)

```bash
# Navigate to project directory
cd /workspaces/solar_tracker

# Install dependencies
npm install

# Start the server
npm start
```

## 2️⃣ Access the Application

### From Your Computer
Open your browser and visit:
```
http://localhost:3000
```

### From Another Device on Your Network
1. Find your machine's IP address:
   ```bash
   # Linux/Mac
   hostname -I
   
   # Or use
   ifconfig | grep inet
   ```

2. Use the IP to access from another device:
   ```
   http://<your-ip>:3000
   ```
   Example: `http://192.168.1.100:3000`

## 3️⃣ Using URL Parameters

You can pass data directly through URLs:

### Navigate by View
```
http://localhost:3000/?view=vendors    # Show vendors
http://localhost:3000/?view=projects   # Show projects
```

### Search Data
```
http://localhost:3000/?search=solar
http://localhost:3000/?search=mumbai
```

### View Specific Vendor
```
http://localhost:3000/?vendor=V001
http://localhost:3000/?vendor=V002
```

### View Specific Project
```
http://localhost:3000/?project=P001
```

### Combine Parameters
```
http://localhost:3000/?view=vendors&search=solar
http://localhost:3000/?vendor=V001&view=vendors
http://localhost:3000/?search=installation&view=projects
```

## 4️⃣ API Endpoints

### Get Vendors
```bash
curl http://localhost:3000/api/vendors
curl http://localhost:3000/api/vendors?status=active
curl http://localhost:3000/api/vendors/V001
```

### Get Projects
```bash
curl http://localhost:3000/api/projects
curl http://localhost:3000/api/projects?vendorId=V001
curl http://localhost:3000/api/projects?status=unpaid
```

### Create Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "V001",
    "name": "New Project",
    "location": "Bangalore",
    "amount": 250000
  }'
```

### Update Payment
```bash
curl -X POST http://localhost:3000/api/projects/P001/payment \
  -H "Content-Type: application/json" \
  -d '{"paidAmount": 125000}'
```

### Get Statistics
```bash
curl http://localhost:3000/api/dashboard/stats
```

## 5️⃣ Sample Data

The app comes pre-loaded with sample data:

### Vendors
- **V001**: Solar Systems Ltd (Mumbai)
- **V002**: Green Energy Solutions (Delhi)
- **V003**: Renewable Power Co (Bangalore)

### Projects
- Multiple projects across vendors
- Various payment statuses
- Different project stages

## 6️⃣ Features

✅ Real-time data sync (auto-refresh every 30 seconds)
✅ Search and filter vendors/projects
✅ View detailed vendor and project information
✅ Create new projects
✅ Update payment status
✅ Responsive mobile-friendly design
✅ RESTful API for programmatic access

## 7️⃣ Development

### Start with Auto-Reload
```bash
npm install -g nodemon
npx nodemon server.js
```

Or if you have a dev script:
```bash
npm run dev
```

### Server Logs
The server displays startup information showing:
- Server URL
- API endpoint
- How to access from other devices
- Example URLs

## 8️⃣ Configuration

Edit `.env` file to customize:
```env
PORT=3000                    # Change server port
API_KEY=surya-ghar-2024    # Change API key
NODE_ENV=development        # development or production
```

## 9️⃣ Troubleshooting

### Port Already in Use
If port 3000 is busy, change it in `.env`:
```env
PORT=5000
```

### Cannot Access from Another Device
1. Check your firewall allows port 3000
2. Use correct IP address (not localhost)
3. Make sure server is running
4. Check both devices are on same network

### API Not Responding
1. Verify server is running
2. Check URL is correct
3. Try refreshing browser
4. Check console for errors

## 🔟 Deployment

### Using Docker
```bash
docker-compose up
```

### Manual Deployment
1. Copy all files to server
2. Run `npm install`
3. Set environment variables
4. Run `npm start`

## 📚 More Information

- **README.md** - Detailed documentation
- **API Reference** - Complete endpoint documentation
- **test-api.sh** - Script with API examples

---

**Your remote-accessible vendor tracker app is ready! 🌞**
