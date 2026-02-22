#!/bin/bash

# ═════════════════════════════════════════════════════════════════════════════
# PM Surya Ghar Tracker - Complete API Testing Guide with Examples
# ═════════════════════════════════════════════════════════════════════════════
# 
# This script contains various curl commands to test all API endpoints
# Copy and paste commands to test different scenarios
#
# ═════════════════════════════════════════════════════════════════════════════

echo "────────────────────────────────────────────────────────────────────────────"
echo "🌞 PM Surya Ghar Tracker - API Testing Reference"
echo "────────────────────────────────────────────────────────────────────────────"
echo ""

BASE_URL="http://localhost:3000"
API_BASE="$BASE_URL/api"

# ═════════════════════════════════════════════════════════════════════════════
# 1. VENDOR ENDPOINTS
# ═════════════════════════════════════════════════════════════════════════════

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║ 1️⃣  VENDOR ENDPOINTS                                                   ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

echo "📌 Get All Vendors:"
echo "   curl -s $API_BASE/vendors | jq"
echo ""

echo "📌 Get Vendors with Status Filter:"
echo "   curl -s '$API_BASE/vendors?status=active' | jq"
echo ""

echo "📌 Search Vendors:"
echo "   curl -s '$API_BASE/vendors?search=solar' | jq"
echo "   curl -s '$API_BASE/vendors?search=delhi' | jq"
echo ""

echo "📌 Get Specific Vendor (V001):"
echo "   curl -s $API_BASE/vendors/V001 | jq"
echo ""

echo "📌 Get Specific Vendor (V002):"
echo "   curl -s $API_BASE/vendors/V002 | jq"
echo ""

echo "📌 Get Specific Vendor (V003):"
echo "   curl -s $API_BASE/vendors/V003 | jq"
echo ""

# ═════════════════════════════════════════════════════════════════════════════
# 2. PROJECT ENDPOINTS
# ═════════════════════════════════════════════════════════════════════════════

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║ 2️⃣  PROJECT ENDPOINTS                                                  ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

echo "📌 Get All Projects:"
echo "   curl -s $API_BASE/projects | jq"
echo ""

echo "📌 Get Projects by Vendor:"
echo "   curl -s '$API_BASE/projects?vendorId=V001' | jq"
echo ""

echo "📌 Get Projects by Payment Status:"
echo "   curl -s '$API_BASE/projects?status=paid' | jq"
echo "   curl -s '$API_BASE/projects?status=partial' | jq"
echo "   curl -s '$API_BASE/projects?status=unpaid' | jq"
echo ""

echo "📌 Get Projects by Stage:"
echo "   curl -s '$API_BASE/projects?stage=pending' | jq"
echo "   curl -s '$API_BASE/projects?stage=in-progress' | jq"
echo "   curl -s '$API_BASE/projects?stage=completed' | jq"
echo ""

echo "📌 Create New Project:"
echo "   curl -X POST $API_BASE/projects \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{"
echo "       \"vendorId\": \"V001\","
echo "       \"name\": \"New Solar Installation\","
echo "       \"location\": \"Bangalore\","
echo "       \"amount\": 350000"
echo "     }' | jq"
echo ""

echo "📌 Update Project Payment:"
echo "   curl -X POST $API_BASE/projects/P001/payment \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"paidAmount\": 125000}' | jq"
echo ""

# ═════════════════════════════════════════════════════════════════════════════
# 3. DASHBOARD ENDPOINTS
# ═════════════════════════════════════════════════════════════════════════════

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║ 3️⃣  DASHBOARD & STATISTICS ENDPOINTS                                   ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

echo "📌 Get Dashboard Statistics:"
echo "   curl -s $API_BASE/dashboard/stats | jq"
echo ""

# ═════════════════════════════════════════════════════════════════════════════
# 4. FRONTEND URL EXAMPLES
# ═════════════════════════════════════════════════════════════════════════════

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║ 4️⃣  FRONTEND URL PARAMETERS                                            ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

echo "📌 View All Vendors:"
echo "   $BASE_URL/?view=vendors"
echo ""

echo "📌 View All Projects:"
echo "   $BASE_URL/?view=projects"
echo ""

echo "📌 View Specific Vendor:"
echo "   $BASE_URL/?vendor=V001"
echo "   $BASE_URL/?vendor=V002"
echo "   $BASE_URL/?vendor=V003"
echo ""

echo "📌 View Specific Project:"
echo "   $BASE_URL/?project=P001"
echo ""

echo "📌 Search in Frontend:"
echo "   $BASE_URL/?search=solar"
echo "   $BASE_URL/?search=mumbai"
echo "   $BASE_URL/?search=delhi"
echo ""

echo "📌 Combined Parameters:"
echo "   $BASE_URL/?view=vendors&search=solar"
echo "   $BASE_URL/?vendor=V001&view=vendors"
echo "   $BASE_URL/?view=projects&search=installation"
echo ""

# ═════════════════════════════════════════════════════════════════════════════
# 5. TESTING SCENARIOS
# ═════════════════════════════════════════════════════════════════════════════

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║ 5️⃣  PRACTICAL TESTING SCENARIOS                                        ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

echo "🧪 SCENARIO 1: Find all unpaid projects from vendor V001"
echo "   curl -s '$API_BASE/projects?vendorId=V001&status=unpaid' | jq"
echo ""

echo "🧪 SCENARIO 2: Check complete vendor details with all projects"
echo "   curl -s $API_BASE/vendors/V001 | jq '.data.projects[] | {id, name, paymentStatus}'"
echo ""

echo "🧪 SCENARIO 3: Create project and verify creation"
echo "   # Create project"
echo "   curl -X POST $API_BASE/projects \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"vendorId\":\"V001\",\"name\":\"Test Project\",\"location\":\"Test City\",\"amount\":250000}' | jq '.data.id'"
echo ""

echo "🧪 SCENARIO 4: Get dashboard stats, then filter by vendor"
echo "   # Get stats"
echo "   curl -s $API_BASE/dashboard/stats | jq '.data | {totalProjects, totalAmount}'"
echo ""

echo "🧪 SCENARIO 5: Find all completed projects"
echo "   curl -s '$API_BASE/projects?stage=completed' | jq"
echo ""

echo "🧪 SCENARIO 6: Calculate payment statistics"
echo "   curl -s $API_BASE/projects | jq '.data | group_by(.paymentStatus) | map({status: .[0].paymentStatus, count: length})'"
echo ""

# ═════════════════════════════════════════════════════════════════════════════
# 6. TESTING WITH POSTMAN / CURL
# ═════════════════════════════════════════════════════════════════════════════

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║ 6️⃣  BATCH TEST COMMANDS                                               ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

echo "Run all vendor tests:"
cat > /tmp/test_vendors.sh << 'EOF'
#!/bin/bash
echo "=== All Vendors ===" && curl -s http://localhost:3000/api/vendors | jq '.data | length'
echo "=== Active Vendors ===" && curl -s http://localhost:3000/api/vendors?status=active | jq '.data | length'
echo "=== Vendor V001 ===" && curl -s http://localhost:3000/api/vendors/V001 | jq '.data.name'
EOF
echo "   bash /tmp/test_vendors.sh"
echo ""

echo "Run all project tests:"
cat > /tmp/test_projects.sh << 'EOF'
#!/bin/bash
echo "=== Total Projects ===" && curl -s http://localhost:3000/api/projects | jq '.data | length'
echo "=== Paid Projects ===" && curl -s http://localhost:3000/api/projects?status=paid | jq '.data | length'
echo "=== Unpaid Projects ===" && curl -s http://localhost:3000/api/projects?status=unpaid | jq '.data | length'
EOF
echo "   bash /tmp/test_projects.sh"
echo ""

# ═════════════════════════════════════════════════════════════════════════════
# 7. PERFORMANCE TESTING
# ═════════════════════════════════════════════════════════════════════════════

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║ 7️⃣  PERFORMANCE & LOAD TESTING                                         ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

echo "📌 Test Response Time:"
echo "   time curl -s $API_BASE/vendors > /dev/null"
echo ""

echo "📌 Load Test (10 concurrent requests):"
echo "   for i in {1..10}; do curl -s $API_BASE/vendors > /dev/null & done"
echo ""

echo "📌 Stress Test (100 requests):"
echo "   for i in {1..100}; do curl -s $API_BASE/vendors > /dev/null; done"
echo ""

echo "📌 Test with Apache Bench (requires ab tool):"
echo "   ab -n 100 -c 10 http://localhost:3000/api/vendors"
echo ""

# ═════════════════════════════════════════════════════════════════════════════
# 8. DATA VALIDATION TESTS
# ═════════════════════════════════════════════════════════════════════════════

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║ 8️⃣  DATA VALIDATION TESTS                                              ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

echo "📌 Check All Required Fields (Vendor):"
echo "   curl -s $API_BASE/vendors/V001 | jq '.data | keys[]'"
echo ""

echo "📌 Check All Required Fields (Project):"
echo "   curl -s $API_BASE/projects | jq '.data[0] | keys[]'"
echo ""

echo "📌 Validate JSON Response:"
echo "   curl -s $API_BASE/vendors | jq '.' > /dev/null && echo 'Valid JSON' || echo 'Invalid JSON'"
echo ""

# ═════════════════════════════════════════════════════════════════════════════
# END OF GUIDE
# ═════════════════════════════════════════════════════════════════════════════

echo ""
echo "────────────────────────────────────────────────────────────────────────────"
echo "✅ API Testing Reference Complete!"
echo "────────────────────────────────────────────────────────────────────────────"
echo ""
echo "📚 Additional Resources:"
echo "   • README.md - Full API documentation"
echo "   • IMPLEMENTATION_SUMMARY.md - Complete feature overview"
echo "   • QUICKSTART.md - Quick start guide"
echo ""
echo "🔗 Frontend: $BASE_URL"
echo "📡 API Base: $API_BASE"
echo ""
echo "Happy Testing! 🌞"
echo ""
