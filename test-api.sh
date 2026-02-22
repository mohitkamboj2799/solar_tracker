#!/bin/bash

# =================================================================
# API Testing Guide - PM Surya Ghar Tracker
# =================================================================

BASE_URL="http://localhost:3000/api"
API_KEY="surya-ghar-2024"

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║    🌞 PM Surya Ghar - API Testing Guide & Examples 🌞        ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper function to make requests
test_api() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4

    echo -e "${BLUE}→${NC} $description"
    echo "  Command: curl -X $method \"$BASE_URL$endpoint\""
    
    if [ -n "$data" ]; then
        echo "  Data: $data"
        curl -s -X "$method" \
            -H "Content-Type: application/json" \
            "$BASE_URL$endpoint" \
            -d "$data" | jq '.' 2>/dev/null || echo "  (Response received)"
    else
        curl -s -X "$method" "$BASE_URL$endpoint" | jq '.' 2>/dev/null || echo "  (Response received)"
    fi
    
    echo ""
    sleep 1
}

echo "Make sure the server is running: npm start"
echo ""

# Test Endpoints
echo -e "${GREEN}1. GET VENDORS${NC}"
test_api "GET" "/vendors" "Get all vendors"

echo -e "${GREEN}2. GET VENDORS WITH FILTERS${NC}"
test_api "GET" "/vendors?status=active" "Get only active vendors"
test_api "GET" "/vendors?search=solar" "Search for vendors containing 'solar'"

echo -e "${GREEN}3. GET SPECIFIC VENDOR${NC}"
test_api "GET" "/vendors/V001" "Get details of vendor V001"

echo -e "${GREEN}4. GET PROJECTS${NC}"
test_api "GET" "/projects" "Get all projects"
test_api "GET" "/projects?vendorId=V001" "Get projects for vendor V001"
test_api "GET" "/projects?status=unpaid" "Get unpaid projects"

echo -e "${GREEN}5. GET DASHBOARD STATS${NC}"
test_api "GET" "/dashboard/stats" "Get dashboard statistics"

echo -e "${GREEN}6. CREATE NEW PROJECT${NC}"
PROJECT_DATA='{"vendorId":"V001","name":"New Installation","location":"Hyderabad","amount":300000}'
test_api "POST" "/projects" "Create new project" "$PROJECT_DATA"

echo -e "${GREEN}7. UPDATE PAYMENT${NC}"
PAYMENT_DATA='{"paidAmount":150000}'
test_api "POST" "/projects/P001/payment" "Update payment for project P001" "$PAYMENT_DATA"

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║               ✅ API Testing Complete!                        ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "🔗 API Documentation: See README.md for complete API reference"
echo ""
