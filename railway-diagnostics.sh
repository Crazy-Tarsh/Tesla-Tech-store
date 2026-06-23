#!/bin/bash
# Railway Deployment Diagnostics

echo "🔍 TESLA Railway Deployment Diagnostics"
echo "========================================"
echo ""

# Check if we're in Railway environment
if [ -z "$RAILWAY_ENVIRONMENT_ID" ]; then
    echo "⚠️  Not running in Railway environment"
else
    echo "✅ Running in Railway"
    echo "   Environment: $RAILWAY_ENVIRONMENT_NAME"
    echo "   Service: $RAILWAY_SERVICE_NAME"
    echo ""
fi

# Check environment variables
echo "📋 Environment Variables:"
echo "========================"

if [ -z "$MONGODB_URI" ]; then
    echo "❌ MONGODB_URI not set"
else
    echo "✅ MONGODB_URI set"
    echo "   $(echo $MONGODB_URI | sed 's/:[^@]*@/:*****@/')"
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ JWT_SECRET not set"
else
    echo "✅ JWT_SECRET set (${#JWT_SECRET} chars)"
fi

if [ -z "$NODE_ENV" ]; then
    echo "❌ NODE_ENV not set"
else
    echo "✅ NODE_ENV: $NODE_ENV"
fi

if [ -z "$PORT" ]; then
    echo "❌ PORT not set"
else
    echo "✅ PORT: $PORT"
fi

if [ -z "$VITE_API_URL" ]; then
    echo "⚠️  VITE_API_URL not set (client only)"
else
    echo "✅ VITE_API_URL: $VITE_API_URL"
fi

echo ""

# Check file structure
echo "📁 File Structure:"
echo "================="

if [ -d "/app/src" ]; then
    echo "✅ /app/src exists"
    ls -la /app/src | head -5
else
    echo "❌ /app/src not found"
fi

echo ""

# Check Node.js
echo "⚙️  Node.js:"
echo "==========="
node --version
npm --version

echo ""

# Test MongoDB connection
echo "🗄️  MongoDB Connection Test:"
echo "============================"

if [ -n "$MONGODB_URI" ]; then
    timeout 10 node -e "
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
    })
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        process.exit(0);
    })
    .catch(err => {
        console.log('❌ MongoDB connection failed:');
        console.log('   ' + err.message);
        process.exit(1);
    });
    " 2>/dev/null || echo "❌ MongoDB connection failed or timeout"
else
    echo "⚠️  MONGODB_URI not set, skipping test"
fi

echo ""

# Check port availability
echo "🔌 Port Check:"
echo "=============="

if [ -n "$PORT" ]; then
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  Port $PORT already in use"
        lsof -i :$PORT
    else
        echo "✅ Port $PORT available"
    fi
else
    echo "⚠️  PORT not set"
fi

echo ""
echo "✅ Diagnostics complete"
