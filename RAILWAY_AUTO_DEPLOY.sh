#!/bin/bash
# 🚀 TESLA Railway Deployment - COMPLETE AUTOMATED GUIDE

set -e

echo "╔═════════════════════════════════════════════════════╗"
echo "║     🚀 TESLA MARKETPLACE - RAILWAY DEPLOYMENT      ║"
echo "╚═════════════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Prerequisites
echo -e "${BLUE}STEP 1: Checking Prerequisites${NC}"
echo "========================================"

if [ -z "$MONGODB_URI" ]; then
    read -p "Enter your MongoDB Atlas URI: " MONGODB_URI
fi

if [ -z "$JWT_SECRET" ]; then
    read -sp "Enter JWT Secret (min 32 chars): " JWT_SECRET
    echo ""
fi

# Step 2: Clear old deployments
echo ""
echo -e "${BLUE}STEP 2: Checking Railway Setup${NC}"
echo "========================================"

if command -v railway &> /dev/null; then
    echo -e "${GREEN}✅ Railway CLI installed${NC}"
else
    echo -e "${YELLOW}📥 Installing Railway CLI...${NC}"
    npm install -g @railway/cli
fi

echo "Login to Railway..."
railway login || true

echo ""
echo -e "${GREEN}✅ Prerequisites ready${NC}"

# Step 3: Initialize Project
echo ""
echo -e "${BLUE}STEP 3: Creating Railway Project${NC}"
echo "========================================"

PROJECT_NAME="tesla-tech-store-$(date +%s)"
echo "Initializing project: $PROJECT_NAME"
railway init --name "$PROJECT_NAME" || true

echo -e "${GREEN}✅ Project created${NC}"

# Step 4: Deploy Server
echo ""
echo -e "${BLUE}STEP 4: Deploying Server Service${NC}"
echo "========================================"

cd server

echo "Creating server service..."
railway service add --name tesla-server || true

echo ""
echo -e "${YELLOW}Setting environment variables...${NC}"
railway variables set MONGODB_URI "$MONGODB_URI"
railway variables set JWT_SECRET "$JWT_SECRET"
railway variables set NODE_ENV "production"
railway variables set PORT "5000"
railway variables set CLIENT_URL "https://tesla-client.up.railway.app"

echo ""
echo -e "${YELLOW}Building and deploying server...${NC}"
railway up --no-cache

SERVER_DOMAIN=$(railway domain)
echo -e "${GREEN}✅ Server deployed: $SERVER_DOMAIN${NC}"

cd ..

# Step 5: Deploy Client
echo ""
echo -e "${BLUE}STEP 5: Deploying Client Service${NC}"
echo "========================================"

cd client

echo "Creating client service..."
railway service add --name tesla-client || true

echo ""
echo -e "${YELLOW}Setting environment variables...${NC}"
railway variables set VITE_API_URL "$SERVER_DOMAIN"

echo ""
echo -e "${YELLOW}Building and deploying client...${NC}"
railway up --no-cache

CLIENT_DOMAIN=$(railway domain)
echo -e "${GREEN}✅ Client deployed: $CLIENT_DOMAIN${NC}"

cd ..

# Step 6: Final Summary
echo ""
echo "╔═════════════════════════════════════════════════════╗"
echo "║           🎉 DEPLOYMENT SUCCESSFUL! 🎉             ║"
echo "╚═════════════════════════════════════════════════════╝"
echo ""

echo -e "${GREEN}Your TESLA Marketplace is LIVE!${NC}"
echo ""
echo "📍 URLs:"
echo -e "   ${BLUE}Client:${NC}  $CLIENT_DOMAIN"
echo -e "   ${BLUE}API:${NC}     $SERVER_DOMAIN/api"
echo ""

echo "✅ Next steps:"
echo "   1. Open $CLIENT_DOMAIN in your browser"
echo "   2. Test the marketplace"
echo "   3. Monitor logs: railway logs -f"
echo ""

echo "📊 Monitor your app:"
echo "   https://railway.app/dashboard"
echo ""
