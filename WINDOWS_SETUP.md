# 🐳 Windows Docker Desktop Setup - Troubleshooting

## ✅ Status: Containers ARE Running

Your Docker containers are running correctly:
- **Server**: http://localhost:5000 ✅
- **Client**: http://localhost:3000 ✅

## 🔍 Verify in PowerShell

```powershell
# Check container status
docker compose ps

# Expected output:
# NAME             IMAGE          STATUS
# tesla-client-1   tesla-client   Up X seconds
# tesla-server-1   tesla-server   Up X seconds
```

## 🌐 Access the Application

### Option 1: Windows Browser (Recommended)
Open these URLs in your Windows browser:
- **Client App**: http://localhost:3000
- **API Health**: http://localhost:5000/api/health

### Option 2: From PowerShell
```powershell
# Test Server API
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing

# Test Client
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing
```

### Option 3: From WSL2 Bash
```bash
# Inside WSL2, use host gateway IP
curl http://host.docker.internal:5000/api/health
curl http://host.docker.internal:3000
```

## ⚠️ Common Issues & Solutions

### Issue 1: "Connection Refused" on localhost:3000

**Cause**: Firewall or Docker Desktop not properly configured

**Solution**:
```powershell
# 1. Check if ports are listening
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# 2. Restart Docker Desktop
# Settings → General → Restart Docker Desktop

# 3. Reset networks
docker network prune -f
docker compose down
docker compose up -d
```

### Issue 2: WSL Integration Not Enabled

**Check**:
- Open Docker Desktop
- Settings → Resources → WSL Integration
- Ensure "Ubuntu" (or your distro) is toggled ON

### Issue 3: Still Can't Connect?

**Debug**:
```powershell
# Check if containers are actually running
docker compose ps -a

# View logs
docker compose logs server
docker compose logs client

# Test from inside container
docker compose exec server wget -qO- http://localhost:5000/api/health

# Check network
docker network inspect tesla_tesla-network
```

## 📱 Access from Browser

### From Windows Host Machine:

**Localhost Access:**
```
http://localhost:3000        # React Client
http://localhost:5000/api    # Node.js API
```

**If localhost doesn't work**, try:
```
http://127.0.0.1:3000
http://127.0.0.1:5000/api
```

**If still not working**, get Docker's IP:
```powershell
$containers = docker network inspect tesla_tesla-network | ConvertFrom-Json
$gateway = $containers[0].IPAM.Config[0].Gateway
Write-Host "Try: http://$gateway:3000"
```

## 🔧 Quick Restart

If anything stops working:

```powershell
# Stop all containers
docker compose down

# Remove volumes to reset
docker compose down -v

# Start fresh
docker compose up -d

# Check status
docker compose ps
```

## ✅ What Should Happen

1. **Navigate to http://localhost:3000**
   - See TESLA marketplace homepage
   - React app loads with products

2. **Navigate to http://localhost:5000/api/health**
   - See JSON response:
   ```json
   {
     "status": "ok",
     "name": "TESLA API",
     "security": [...]
   }
   ```

3. **Open Browser DevTools (F12)**
   - Check Network tab
   - API calls should go to http://localhost:5000
   - No 404/503 errors

## 📊 Expected Behavior

| Service | Port | Status | Access |
|---------|------|--------|--------|
| React Client | 3000 | ✅ Running | http://localhost:3000 |
| Node.js Server | 5000 | ✅ Running | http://localhost:5000/api |
| MongoDB | 27017 | ✅ Connected | Internal only |
| Nginx | 80 | ✅ Inside container | Via port 3000 |

## 🆘 Still Not Working?

Run this diagnostic:

```powershell
# 1. Check Docker is running
docker version

# 2. List all containers
docker ps -a

# 3. Check logs for errors
docker compose logs --tail=50

# 4. Test network connectivity
docker compose exec server ping -c 1 8.8.8.8

# 5. Test MongoDB connection
docker compose exec server wget -qO- http://localhost:5000/api/health
```

Then share the output with exact error messages.

## 🎯 Success Indicators

✅ `docker compose ps` shows both containers as "Up"
✅ Logs show "MongoDB connected successfully"
✅ Logs show "TESLA API running on http://localhost:5000"
✅ Browser loads http://localhost:3000 with no errors
✅ API responds with JSON at http://localhost:5000/api/health
