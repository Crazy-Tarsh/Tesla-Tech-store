# Docker Deployment Guide

## Development

Start the full stack locally:

```bash
docker compose up -d
```

Access services:
- **Client:** http://localhost:3000
- **Server API:** http://localhost:5000/api
- **MongoDB:** localhost:27017

View logs:

```bash
docker compose logs -f server
docker compose logs -f client
docker compose logs -f mongodb
```

Stop services:

```bash
docker compose down
```

## Production Deployment

### Prerequisites

1. Set up GitHub Actions secrets in your repository:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Docker Hub access token (create at https://hub.docker.com/settings/security)

2. Create a `.env.prod` file (never commit this):

```bash
MONGODB_ROOT_USER=admin
MONGODB_ROOT_PASSWORD=<secure-password>
JWT_SECRET=<long-random-secret>
CLIENT_URL=https://yourdomain.com
DOCKERHUB_USERNAME=yourname
IMAGE_TAG=latest
```

### Deploy with Docker Compose

```bash
# Load environment variables
export $(cat .env.prod | xargs)

# Pull latest images
docker compose -f docker-compose.prod.yml pull

# Start services
docker compose -f docker-compose.prod.yml up -d

# Check status
docker compose -f docker-compose.prod.yml ps
```

### CI/CD Workflows

#### Build & Test (on push to main/develop, on PRs)

Automatically builds both images and runs health checks.

```bash
# Triggered on:
# - Push to main or develop
# - Pull requests to main or develop
```

#### Push to Registry (on push to main or version tags)

Automatically builds and pushes images to Docker Hub.

```bash
# Set your Docker Hub credentials as GitHub Secrets first
# Images are tagged with: branch-name, version (v1.0.0 → 1.0.0, 1.0), and commit SHA
```

### Kubernetes Deployment (Optional)

Create `k8s-deployment.yml`:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: tesla

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
  namespace: tesla
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:latest
        ports:
        - containerPort: 27017
        env:
        - name: MONGO_INITDB_DATABASE
          value: tesla_marketplace
        volumeMounts:
        - name: mongo-data
          mountPath: /data/db
      volumes:
      - name: mongo-data
        emptyDir: {}

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: server
  namespace: tesla
spec:
  replicas: 2
  selector:
    matchLabels:
      app: server
  template:
    metadata:
      labels:
        app: server
    spec:
      containers:
      - name: server
        image: yourname/tesla-server:latest
        ports:
        - containerPort: 5000
        env:
        - name: NODE_ENV
          value: production
        - name: MONGODB_URI
          value: mongodb://mongodb:27017/tesla_marketplace
        livenessProbe:
          httpGet:
            path: /api/health
            port: 5000
          initialDelaySeconds: 10
          periodSeconds: 10

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: client
  namespace: tesla
spec:
  replicas: 2
  selector:
    matchLabels:
      app: client
  template:
    metadata:
      labels:
        app: client
    spec:
      containers:
      - name: client
        image: yourname/tesla-client:latest
        ports:
        - containerPort: 80
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 10

---
apiVersion: v1
kind: Service
metadata:
  name: server
  namespace: tesla
spec:
  selector:
    app: server
  ports:
  - protocol: TCP
    port: 5000
    targetPort: 5000
  type: ClusterIP

---
apiVersion: v1
kind: Service
metadata:
  name: client
  namespace: tesla
spec:
  selector:
    app: client
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

Deploy to Kubernetes:

```bash
kubectl apply -f k8s-deployment.yml
```

## Security Notes

- **Never commit `.env` or `.env.prod`** — store secrets in GitHub Secrets or your deployment platform
- **Use strong JWT_SECRET** — generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- **MongoDB auth** — always set `MONGODB_ROOT_PASSWORD` in production
- **HTTPS** — use a reverse proxy (nginx, Traefik) or cloud load balancer in production
- **Image scanning** — enable GitHub security scanning or use Snyk to scan for vulnerabilities

## Monitoring

```bash
# Check resource usage
docker compose stats

# View real-time logs
docker compose logs -f

# Inspect container
docker inspect tesla-server-1
```

## Troubleshooting

**Server won't start:**

```bash
docker compose logs server
```

**MongoDB connection errors:**

```bash
docker compose exec server curl -f http://localhost:5000/api/health
```

**Client showing blank page:**

```bash
docker compose exec client curl -f http://localhost/health
```
