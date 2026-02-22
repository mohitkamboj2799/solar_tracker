const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || 'surya-ghar-2024';

// ─────────────────────────────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────────────────────────────

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─────────────────────────────────────────────────────────────────
// API KEY VERIFICATION MIDDLEWARE
// ─────────────────────────────────────────────────────────────────

const verifyApiKey = (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (key && key === API_KEY) {
    next();
  } else {
    // Allow access without key for development
    next();
  }
};

// ─────────────────────────────────────────────────────────────────
// IN-MEMORY DATA STORE (Replace with database for prod)
// ─────────────────────────────────────────────────────────────────

let consumers = [
  {id:'1',name:'Bhag Ram',location:'Khuwala, Nanakpur, Pinjore',discom:'UHBVN',
   amount:395000,subsidy:0,netcost:395000,paid:395000,balance:0,paymode:'Cash',payref:'',
   inverter:'Evvo',invcap:8,module:'Vikram DCR',modcap:350,panels:20,stageIdx:5,
   uhbvnStatus:'Connection released',npStatus:'CFA released',
   loads:['AC (1.5 Ton)','Water Pump (1HP)','LED Lights'],notes:'Project completed. Energy generation: 8200 kWh/year',date:'17-12-2022',
   milestones:{confirmationDate:'17-12-2022',invoiceDate:'17-12-2022',mnreDate:'05-12-2022',uhbvnDate:'10-12-2022',
     discomSubmission:'12-12-2022',netMeterDate:'17-12-2022',inverterSettingsDate:'16-12-2022',weekVisitDate:'15-12-2022',
     pcrDate:'17-12-2022',pcrApprovalDate:'17-12-2022',subsidyRequestDate:'17-12-2022',subsidyDisbursalDate:'20-12-2022'},
   payments:[{date:'17-12-2022',amount:395000,mode:'Cash',ref:'',remark:'Full payment received'}]},
  {id:'SG-2024-002',name:'Sunita Devi',location:'Varanasi, UP',discom:'PuVVNL',
   amount:78000,subsidy:45000,netcost:33000,paid:15000,balance:18000,paymode:'Cash',payref:'',
   inverter:'Microtek',invcap:2,module:'Adani Solar',modcap:440,panels:5,stageIdx:2,
   uhbvnStatus:'Application received',npStatus:'Pending',
   loads:['LED Lights','Refrigerator','Washing Machine'],
   notes:'Installation completed. Net meter pending.',date:'2024-04-22',
   milestones:{confirmationDate:'2024-04-15',invoiceDate:'2024-04-18',mnreDate:'2024-04-10',uhbvnDate:'',
     discomSubmission:'2024-04-22',netMeterDate:'',inverterSettingsDate:'2024-04-22',weekVisitDate:'2024-04-20',
     pcrDate:'',pcrApprovalDate:'',subsidyRequestDate:'',subsidyDisbursalDate:''},
   payments:[{date:'2024-04-22',amount:15000,mode:'Cash',ref:'',remark:'Advance payment'}]},
  {id:'SG-2024-003',name:'Ramesh Prasad Gupta',location:'Kanpur, UP',discom:'KESCO',
   amount:142000,subsidy:78000,netcost:64000,paid:64000,balance:0,paymode:'NEFT',payref:'NEFT-2024-KNP',
   inverter:'Havells',invcap:5,module:'Vikram Solar',modcap:540,panels:10,stageIdx:3,
   uhbvnStatus:'Net meter installed',npStatus:'Testing in progress',
   loads:['AC (1.5 Ton)','EV Charging','Water Pump (1HP)','CCTV & Security'],
   notes:'Net meter applied. Awaiting DISCOM inspection. PCR approval expected in 7 days.',date:'2024-04-05',
   milestones:{confirmationDate:'2024-03-28',invoiceDate:'2024-04-01',mnreDate:'2024-03-25',uhbvnDate:'2024-04-02',
     discomSubmission:'2024-04-03',netMeterDate:'2024-04-04',inverterSettingsDate:'2024-04-04',weekVisitDate:'2024-04-02',
     pcrDate:'2024-04-10',pcrApprovalDate:'2024-04-15',subsidyRequestDate:'',subsidyDisbursalDate:''},
   payments:[{date:'2024-04-01',amount:30000,mode:'NEFT',ref:'NEFT-001',remark:'1st installment'},
             {date:'2024-04-05',amount:34000,mode:'NEFT',ref:'NEFT-2024-KNP',remark:'2nd installment'}]},
  {id:'SG-2024-004',name:'Meena Agarwal',location:'Agra, UP',discom:'DVVNL',
   amount:65000,subsidy:30000,netcost:35000,paid:0,balance:35000,paymode:'',payref:'',
   inverter:'Microtek',invcap:1,module:'Tata Power Solar',modcap:400,panels:3,stageIdx:0,
   uhbvnStatus:'Application submitted',npStatus:'Not started',
   loads:['LED Lights'],notes:'Application just submitted. Awaiting feasibility report. Expected timeline: 2-3 weeks.',date:'2024-05-15',
   milestones:{confirmationDate:'',invoiceDate:'',mnreDate:'',uhbvnDate:'',
     discomSubmission:'',netMeterDate:'',inverterSettingsDate:'',weekVisitDate:'',
     pcrDate:'',pcrApprovalDate:'',subsidyRequestDate:'',subsidyDisbursalDate:''},
   payments:[]},
  {id:'SG-2024-005',name:'Vijay Singh',location:'Gorakhpur, UP',discom:'PuVVNL',
   amount:115000,subsidy:63000,netcost:52000,paid:25000,balance:27000,paymode:'Cheque',payref:'CHQ-4421',
   inverter:'Microtek',invcap:3,module:'Waaree',modcap:540,panels:7,stageIdx:1,
   uhbvnStatus:'Approved',npStatus:'Application submitted',
   loads:['Water Pump (1HP)','Geyser (2kW)','Refrigerator','LED Lights'],
   notes:'DISCOM approved. Installation scheduled for next week. Contractor: SolarTech Solutions',date:'2024-05-02',
   milestones:{confirmationDate:'2024-04-25',invoiceDate:'2024-05-01',mnreDate:'2024-04-20',uhbvnDate:'2024-05-02',
     discomSubmission:'2024-05-03',netMeterDate:'',inverterSettingsDate:'',weekVisitDate:'',
     pcrDate:'',pcrApprovalDate:'',subsidyRequestDate:'',subsidyDisbursalDate:''},
   payments:[{date:'2024-05-02',amount:25000,mode:'Cheque',ref:'CHQ-4421',remark:'Advance cheque'}]},
  {id:'SG-2024-006',name:'Priya Tiwari',location:'Prayagraj, UP',discom:'MVVNL',
   amount:88000,subsidy:45000,netcost:43000,paid:43000,balance:0,paymode:'UPI',payref:'GPay-PP-9910',
   inverter:'SolarEdge',invcap:3,module:'Jinko Solar',modcap:500,panels:6,stageIdx:5,
   uhbvnStatus:'Connection released',npStatus:'CFA released',
   loads:['AC (1.5 Ton)','EV Charging','LED Lights'],
   notes:'Project complete. Consumer satisfied. Total generation expected: 4100 kWh/year. Subsidy disbursed.',date:'2024-03-28',
   milestones:{confirmationDate:'2024-03-10',invoiceDate:'2024-03-16',mnreDate:'2024-03-05',uhbvnDate:'2024-03-18',
     discomSubmission:'2024-03-19',netMeterDate:'2024-03-24',inverterSettingsDate:'2024-03-25',weekVisitDate:'2024-03-23',
     pcrDate:'2024-03-26',pcrApprovalDate:'2024-03-27',subsidyRequestDate:'2024-03-27',subsidyDisbursalDate:'2024-03-28'},
   payments:[{date:'2024-03-16',amount:20000,mode:'UPI',ref:'GPay-001',remark:'Advance'},
             {date:'2024-03-28',amount:23000,mode:'UPI',ref:'GPay-PP-9910',remark:'Final'}]},
];

// ─────────────────────────────────────────────────────────────────
// API ROUTES
// ─────────────────────────────────────────────────────────────────

// Get all consumers - return array directly for original HTML to use
app.get('/api/consumers', verifyApiKey, (req, res) => {
  res.json(consumers);
});

// Get single consumer details
app.get('/api/consumers/:id', verifyApiKey, (req, res) => {
  const consumer = consumers.find(c => c.id === req.params.id);

  if (!consumer) {
    return res.status(404).json({
      success: false,
      message: 'Consumer not found'
    });
  }

  res.json(consumer);
});

// Sync consumers from client (POST all consumers - replaces server data)
app.post('/api/consumers', verifyApiKey, (req, res) => {
  if (Array.isArray(req.body)) {
    consumers = req.body;
    res.json({ success: true, message: 'Consumers synced', count: consumers.length });
  } else if (req.body && typeof req.body === 'object') {
    // Handle single consumer add
    const newConsumer = req.body;
    if (!newConsumer.id) {
      newConsumer.id = 'SG-' + new Date().getFullYear() + '-' + String(consumers.length + 1).padStart(3, '0');
    }
    consumers.push(newConsumer);
    res.json({ success: true, message: 'Consumer added', data: newConsumer });
  } else {
    res.status(400).json({ success: false, message: 'Invalid data format' });
  }
});

// Update consumer
app.put('/api/consumers/:id', verifyApiKey, (req, res) => {
  const consumer = consumers.find(c => c.id === req.params.id);

  if (!consumer) {
    return res.status(404).json({
      success: false,
      message: 'Consumer not found'
    });
  }

  Object.assign(consumer, req.body);

  res.json({
    success: true,
    message: 'Consumer updated successfully',
    data: consumer
  });
});

// Add payment
app.post('/api/consumers/:id/payment', verifyApiKey, (req, res) => {
  const { amount, mode, notes } = req.body;
  const consumer = consumers.find(c => c.id === req.params.id);

  if (!consumer) {
    return res.status(404).json({
      success: false,
      message: 'Consumer not found'
    });
  }

  consumer.paidAmount += amount;
  if (consumer.paidAmount >= consumer.totalAmount) {
    consumer.paymentStatus = 'paid';
  } else {
    consumer.paymentStatus = 'partial';
  }

  paymentHistory.push({
    consumerId: req.params.id,
    amount,
    date: new Date().toISOString().split('T')[0],
    mode: mode || 'Bank Transfer',
    notes: notes || ''
  });

  res.json({
    success: true,
    message: 'Payment added successfully',
    data: consumer
  });
});

// Get dashboard stats
app.get('/api/dashboard', verifyApiKey, (req, res) => {
  const total = consumers.length;
  const completed = consumers.filter(c => c.stage === 'Subsidy Released').length;
  const inProgress = consumers.filter(c => ['Installation Done', 'Inspection Done', 'Net Meter Applied'].includes(c.stage)).length;
  const pending = consumers.filter(c => ['Application Submitted', 'DISCOM Approved'].includes(c.stage)).length;

  const totalBilled = consumers.reduce((sum, c) => sum + (c.totalAmount || 0), 0);
  const totalReceived = consumers.reduce((sum, c) => sum + (c.paidAmount || 0), 0);
  const totalRemaining = totalBilled - totalReceived;

  const fullPaid = consumers.filter(c => c.paymentStatus === 'paid').length;
  const partial = consumers.filter(c => c.paymentStatus === 'partial').length;
  const unpaid = consumers.filter(c => c.paymentStatus === 'unpaid').length;

  res.json({
    success: true,
    data: {
      totalConsumers: total,
      completedProjects: completed,
      inProgressProjects: inProgress,
      pendingProjects: pending,
      totalBilled,
      totalReceived,
      totalRemaining,
      paymentStats: { fullPaid, partial, unpaid }
    }
  });
});

// Export data as JSON
app.get('/api/export/json', verifyApiKey, (req, res) => {
  res.json({
    consumers,
    paymentHistory,
    exportDate: new Date().toISOString()
  });
});

// ─────────────────────────────────────────────────────────────────
// SERVE MAIN APP
// ─────────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

// ─────────────────────────────────────────────────────────────────
// ERROR HANDLING
// ─────────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// ─────────────────────────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────────────────────────

const server = app.listen(PORT, '0.0.0.0', () => {
  const hostname = require('os').hostname();
  const interfaces = require('os').networkInterfaces();
  let ipAddress = 'localhost';
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ipAddress = iface.address;
      }
    }
  }
  
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║      🌞 PM Surya Ghar Vendor Tracker - Remote API 🌞         ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ✅ SERVER RUNNING ON ALL INTERFACES                         ║
║                                                               ║
║  📡 Local Access: http://localhost:${PORT}                  ║
║  🌐 Remote Access: http://${ipAddress}:${PORT}              ║
║  📱 Access from any device on your network                   ║
║  🔑 API Key: ${API_KEY}                      ║
║                                                               ║
║  Example URLs:                                                ║
║  • http://${ipAddress}:${PORT}/?vendor=V001               ║
║  • http://${ipAddress}:${PORT}/api/vendors                ║
║  • http://${ipAddress}:${PORT}/api/projects?vendorId=V001║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});
