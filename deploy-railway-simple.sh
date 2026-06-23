#!/bin/bash
# Simple Railway Deploy Script

echo "🚀 TESLA Railway Deployment"
echo "============================"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📥 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "✅ Railway CLI ready"
echo ""

# Step 1: Login
echo "📝 Step 1: Login to Railway"
railway login
echo ""

# Step 2: Create/Select Project
echo "🆕 Step 2: Creating/Selecting Railway project..."
railway init --name tesla-tech-store
echo ""

# Get project info
echo "📊 Project Info:"
railway whoami
echo ""

# Step 3: Deploy Server
echo "📦 Step 3: Deploying Server..."
echo ""

cd server

echo "Adding server service..."
railway service add --name tesla-server

echo ""
echo "Setting server environment variables..."
read -sp "Enter MongoDB URI (paste from .env): " MONGODB_URI
railway variables set MONGODB_URI "$MONGODB_URI"

read -sp "Enter JWT Secret (min 32 chars): " JWT_SECRET
railway variables set JWT_SECRET "$JWT_SECRET"

railway variables set NODE_ENV "production"
railway variables set PORT "5000"
railway variables set CLIENT_URL "https://tesla-client.up.railway.app"

echo ""
echo "🏗️  Building and deploying server..."
railway up --no-cache

echo ""
echo "✅ Server deployed!"
echo ""

# Get server URL
SERVER_URL=$(railway domain | grep -oP 'https://[^\s]+' | head -1)
echo "📍 Server URL: $SERVER_URL"
echo ""

# Step 4: Deploy Client
echo "📦 Step 4: Deploying Client..."
echo ""

cd ../client

echo "Adding client service..."
railway service add --name tesla-client

echo ""
echo "Setting client environment variables..."
railway variables set VITE_API_URL "$SERVER_URL"

echo ""
echo "🏗️  Building and deploying client..."
railway up --no-cache

echo ""
echo "✅ Client deployed!"
echo ""

# Get client URL
CLIENT_URL=$(railway domain | grep -oP 'https://[^\s]+' | head -1)
echo "📍 Client URL: $CLIENT_URL"
echo ""

# Final summary
echo ""
echo "🎉 Deployment Complete!"
echo "========================"
echo ""
echo "Your app is live at:"
echo "  🌐 Client: $CLIENT_URL"
echo "  🔌 API: $SERVER_URL/api"
echo ""
echo "✅ Next steps:"
echo "  1. Open $CLIENT_URL in your browser"
echo "  2. Test the application"
echo "  3. Monitor logs: railway logs -f"
echo ""
