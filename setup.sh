#!/bin/bash

# =================================================================
# PM Surya Ghar Tracker - Quick Start Installation & Setup Script
# =================================================================

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║  🌞 PM Surya Ghar - Vendor Tracker v2 - Setup Wizard 🌞      ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp -i .env.example .env 2>/dev/null || {
        cat > .env << 'EOF'
PORT=3000
API_KEY=surya-ghar-2024
NODE_ENV=development
EOF
    }
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║              ✅ Setup Complete! Ready to Start               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "🚀 To start the server, run:"
echo "   npm start"
echo ""
echo "📊 Then open in your browser:"
echo "   http://localhost:3000"
echo ""
echo "📡 Access from another device:"
echo "   http://<your-ip>:3000"
echo ""
echo "🔗 Try these example URLs:"
echo "   • http://localhost:3000/?view=vendors"
echo "   • http://localhost:3000/?view=projects"
echo "   • http://localhost:3000/?vendor=V001"
echo "   • http://localhost:3000/?search=solar"
echo ""
echo "📚 For more information, see README.md"
echo ""
