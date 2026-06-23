#!/bin/bash
# Quick Railway Deployment Script

set -e

echo "🚀 TESLA Railway Deployment Script"
echo "=================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

echo "✅ Railway CLI found"
echo ""

# Login
echo "📝 Logging into Railway..."
railway login
echo ""

# Initialize project
echo "🆕 Creating new Railway project..."
railway init
echo ""

# Get project ID
PROJECT_ID=$(railway project)
echo "✅ Project created: $PROJECT_ID"
echo ""

# Set environment variables
echo "🔐 Setting environment variables..."

read -sp "Enter your MongoDB Atlas password: " MONGO_PASSWORD
echo ""

MONGODB_URI="mongodb+srv://tarshanvivek_db_user:$MONGO_PASSWORD@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0"

railway variables set MONGODB_URI "$MONGODB_URI"
railway variables set NODE_ENV "production"
railway variables set JWT_SECRET "$(openssl rand -base64 32)"
railway variables set CLIENT_URL "https://tesla-client-$(openssl rand -hex 4 | cut -c1-8).up.railway.app"

echo "✅ Environment variables set"
echo ""

# Deploy server
echo "📦 Deploying server..."
cd server
railway service remove tesla-server 2>/dev/null || true
railway service add --name tesla-server
railway up
echo "✅ Server deployed"
echo ""

# Deploy client
echo "📦 Deploying client..."
cd ../client
railway service remove tesla-client 2>/dev/null || true
railway service add --name tesla-client
railway variables set VITE_API_URL "https://tesla-server-$(railway project).up.railway.app"
railway up
echo "✅ Client deployed"
echo ""

echo "🎉 Deployment complete!"
echo ""
echo "Your app is live at:"
echo "  Client: https://tesla-client.up.railway.app"
echo "  API: https://tesla-server.up.railway.app"
