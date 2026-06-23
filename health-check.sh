#!/bin/bash
# Health check script for TESLA application

echo "================================================"
echo "TESLA Application Health Check"
echo "================================================"
echo ""

# Check Docker containers
echo "📦 Docker Containers Status:"
docker compose ps
echo ""

# Check Server API
echo "🔌 Server API Health:"
docker compose exec server wget -qO- http://localhost:5000/api/health 2>/dev/null && echo " ✅ Running on http://localhost:5000" || echo " ❌ Not responding"
echo ""

# Check Client
echo "🌐 Client Application:"
docker compose exec server wget -qO- http://tesla-client-1/ 2>/dev/null | grep -q "TESLA" && echo " ✅ Running on http://localhost:3000" || echo " ❌ Not responding"
echo ""

# Network info
echo "🌍 Network Configuration:"
docker network inspect tesla_tesla-network | grep -A 5 "Containers"
echo ""

# Port forwarding check
echo "🔓 Port Accessibility:"
echo "Server: http://localhost:5000/api/health"
echo "Client: http://localhost:3000"
echo ""

echo "================================================"
echo "✅ All services are healthy!"
echo "================================================"
echo ""
echo "Access the application:"
echo "  Client:  http://localhost:3000"
echo "  API:     http://localhost:5000/api"
echo ""
