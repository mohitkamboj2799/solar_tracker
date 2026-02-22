# 🌞 PM Surya Ghar - Vendor Tracker v2 (Remote Access App)

A modern, remotely accessible web application for managing PM Surya Ghar solar vendor projects with URL-based data passing and real-time API endpoints.

## ✨ Features

- **Remote Access**: Access from any device on your network
- **URL Parameters**: Pass data through URL query parameters
- **RESTful API**: Complete API for programmatic access
- **Real-time Sync**: Auto-refreshes data every 30 seconds
- **Search & Filter**: Find vendors and projects instantly
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Dark theme with solar energy aesthetics

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment** (optional)
   Edit `.env` file to customize:
   ```
   PORT=3000
   API_KEY=surya-ghar-2024
   NODE_ENV=development
   ```

3. **Start the Server**
   ```bash
   npm start
   ```

4. **Access the App**
   - Open `http://localhost:3000` in your browser
   - Or access from another device: `http://<your-ip>:3000`

## 🌐 URL Parameters Usage

The app supports URL parameters for direct navigation and data passing:

### View Control
```
http://localhost:3000/?view=vendors
http://localhost:3000/?view=projects
```

### Search
```
http://localhost:3000/?search=mumbai
http://localhost:3000/?search=solar
```

### Vendor Details
```
http://localhost:3000/?vendor=V001
http://localhost:3000/?vendor=V002&view=vendors
```

### Project Details
```
http://localhost:3000/?project=P001
```

### Combined Parameters
```
http://localhost:3000/?view=projects&search=solar&vendor=V001
http://localhost:3000/?vendor=V001&search=installation
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Vendors

#### Get All Vendors
```bash
GET /api/vendors
```
**Query Parameters:**
- `status` - Filter by status (active, pending)
- `search` - Search by name, location, or ID

**Example:**
```bash
curl "http://localhost:3000/api/vendors?status=active"
curl "http://localhost:3000/api/vendors?search=mumbai"
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "V001",
      "name": "Solar Systems Ltd",
      "location": "Mumbai, Maharashtra",
      "email": "contact@solarsystems.com",
      "phone": "9876543210",
      "status": "active",
      "totalProjects": 45,
      "completedProjects": 38,
      "pendingProjects": 7
    }
  ]
}
```

#### Get Vendor by ID
```bash
GET /api/vendors/:id
```

**Example:**
```bash
curl "http://localhost:3000/api/vendors/V001"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "V001",
    "name": "Solar Systems Ltd",
    "location": "Mumbai, Maharashtra",
    "email": "contact@solarsystems.com",
    "phone": "9876543210",
    "status": "active",
    "totalProjects": 45,
    "completedProjects": 38,
    "pendingProjects": 7,
    "projects": [
      {
        "id": "P001",
        "name": "Residential Solar Installation",
        "location": "Mumbai",
        "amount": 250000,
        "paidAmount": 250000,
        "paymentStatus": "paid",
        "stage": "completed"
      }
    ]
  }
}
```

### Projects

#### Get All Projects
```bash
GET /api/projects
```
**Query Parameters:**
- `vendorId` - Filter by vendor
- `status` - Filter by payment status (paid, partial, unpaid)
- `stage` - Filter by project stage (pending, in-progress, completed)

**Example:**
```bash
curl "http://localhost:3000/api/projects?vendorId=V001"
curl "http://localhost:3000/api/projects?status=unpaid"
curl "http://localhost:3000/api/projects?stage=completed"
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "P001",
      "vendorId": "V001",
      "name": "Residential Solar Installation - Phase 1",
      "location": "Mumbai",
      "amount": 250000,
      "paidAmount": 250000,
      "paymentStatus": "paid",
      "stage": "completed",
      "date": "2024-01-15"
    }
  ]
}
```

#### Create New Project
```bash
POST /api/projects
Content-Type: application/json
```

**Request Body:**
```json
{
  "vendorId": "V001",
  "name": "New Solar Project",
  "location": "Bangalore",
  "amount": 300000
}
```

**Example:**
```bash
curl -X POST "http://localhost:3000/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "vendorId": "V001",
    "name": "New Commercial Solar",
    "location": "Bangalore",
    "amount": 500000
  }'
```

#### Update Project Payment
```bash
POST /api/projects/:id/payment
Content-Type: application/json
```

**Request Body:**
```json
{
  "paidAmount": 125000,
  "status": "partial"
}
```

**Example:**
```bash
curl -X POST "http://localhost:3000/api/projects/P001/payment" \
  -H "Content-Type: application/json" \
  -d '{"paidAmount": 125000}'
```

### Dashboard Statistics

#### Get Dashboard Stats
```bash
GET /api/dashboard/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalVendors": 3,
    "activeVendors": 2,
    "totalProjects": 25,
    "completedProjects": 18,
    "totalAmount": 2500000,
    "paidAmount": 1750000,
    "pendingAmount": 750000
  }
}
```

## 🔐 Security

### API Key Authentication
By default, the API doesn't enforce authentication. To enable it:

1. Set a strong API key in `.env`:
   ```
   API_KEY=your-secret-api-key-here
   ```

2. Include the API key in requests:
   ```bash
   curl -H "X-API-Key: your-secret-api-key-here" "http://localhost:3000/api/vendors"
   ```

## 📱 Accessing from Other Devices

### Find Your IP Address
```bash
# Linux/Mac
hostname -I

# Windows
ipconfig
```

### Access URL
Replace `<your-ip>` with your machine's IP:
```
http://<your-ip>:3000
```

### Example
If your IP is `192.168.1.100`:
```
http://192.168.1.100:3000
http://192.168.1.100:3000/?vendor=V001
http://192.168.1.100:3000/?view=projects&search=solar
```

## 🛠️ Development

### Project Structure
```
solar_tracker/
├── server.js              # Express server with API routes
├── package.json           # Dependencies and scripts
├── .env                   # Environment configuration
├── .env.example           # Example environment variables
├── public/
│   └── index.html         # Frontend React-like single page app
└── README.md              # This file
```

### Available Scripts
```bash
npm start       # Start production server
npm run dev     # Start with auto-reload (requires nodemon)
```

## 🚀 Deployment

### Docker Deployment
```dockerfile
FROM node:16
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
```

### Deploy to Cloud
- **Heroku**: Update `package.json` and push to Heroku
- **AWS**: Use ElasticBeanstalk or EC2
- **Google Cloud**: Deploy to App Engine
- **DigitalOcean**: Use App Platform

## 📊 Sample Data

The app comes with pre-loaded sample data:

### Vendors
- **V001**: Solar Systems Ltd (Mumbai)
- **V002**: Green Energy Solutions (Delhi)
- **V003**: Renewable Power Co (Bangalore)

### Projects
- 3 sample projects across vendors
- Various payment statuses (paid, partial, unpaid)
- Different project stages (pending, in-progress, completed)

## 🔄 Real-time Updates

The app automatically refreshes data every 30 seconds to keep information current. No manual refresh needed unless you're testing API changes.

## 📝 License

This project is part of the PM Surya Ghar initiative.

## 🤝 Support

For issues or feature requests, please contact the development team.

---

**Built with ❤️ for Solar Energy Management**
