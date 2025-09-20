# Health Monitoring System - Deployment Guide

This guide will help you deploy the Health Monitoring System with database support so it can be accessed from multiple devices.

## 🏗️ Architecture Overview

The system consists of:
- **Frontend Applications**: ASHA Worker Dashboard, Health Worker Dashboard, Login Page
- **Backend API**: Flask application with ML predictions
- **Database**: PostgreSQL for data persistence
- **Reverse Proxy**: Nginx for routing and load balancing
- **Cache**: Redis for performance optimization

## 📋 Prerequisites

Before deploying, ensure you have:

1. **Docker** (version 20.10 or higher)
2. **Docker Compose** (version 2.0 or higher)
3. **Git** (to clone the repository)
4. **At least 4GB RAM** available for containers
5. **Ports 80, 443, 5000, 3001, 3002, 3003, 5432, 6379** available

### Install Docker (if not already installed)

**On macOS:**
```bash
# Install using Homebrew
brew install --cask docker

# Or download from https://www.docker.com/products/docker-desktop
```

**On Ubuntu/Debian:**
```bash
# Update package index
sudo apt update

# Install Docker
sudo apt install docker.io docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER
```

## 🚀 Quick Deployment

### 1. Clone and Navigate
```bash
git clone <your-repository-url>
cd SIH
```

### 2. Configure Environment
```bash
# Copy environment template
cp env.example .env

# Edit the configuration
nano .env
```

**Important**: Update these values in `.env`:
- `SECRET_KEY`: Generate a strong secret key
- `JWT_SECRET_KEY`: Generate a strong JWT secret
- `CORS_ORIGINS`: Add your domain/IP addresses
- `POSTGRES_PASSWORD`: Set a strong database password

### 3. Deploy
```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 4. Access Your Application

After successful deployment, access your application at:

- **Login Page**: http://localhost:3003/
- **ASHA Dashboard**: http://localhost:3001/
- **Health Worker Dashboard**: http://localhost:3002/
- **API**: http://localhost:5000/

## 🌐 Multi-Device Access

To access from other devices on your network:

### 1. Find Your Server's IP Address

**On macOS/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**On Windows:**
```cmd
ipconfig
```

### 2. Update CORS Configuration

Edit your `.env` file and add your server's IP:
```bash
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:5174,http://localhost:8081,http://localhost:80,http://localhost:443,http://YOUR_SERVER_IP:3001,http://YOUR_SERVER_IP:3002,http://YOUR_SERVER_IP:3003,http://YOUR_SERVER_IP:5000
```

### 3. Restart Services
```bash
docker-compose restart
```

### 4. Access from Other Devices

Replace `localhost` with your server's IP:
- **Login Page**: http://YOUR_SERVER_IP:3003/
- **ASHA Dashboard**: http://YOUR_SERVER_IP:3001/
- **Health Worker Dashboard**: http://YOUR_SERVER_IP:3002/

## 🔧 Manual Deployment

If you prefer to deploy manually:

### 1. Start Database
```bash
docker-compose up -d db
```

### 2. Start API
```bash
docker-compose up -d api
```

### 3. Start Frontend Applications
```bash
docker-compose up -d asha-dashboard health-dashboard login-page
```

### 4. Start Nginx (Optional)
```bash
docker-compose up -d nginx
```

## 📊 Monitoring and Management

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f asha-dashboard
```

### Check Service Status
```bash
docker-compose ps
```

### Restart Services
```bash
# All services
docker-compose restart

# Specific service
docker-compose restart api
```

### Stop Services
```bash
docker-compose down
```

### Clean Deployment (Remove all data)
```bash
docker-compose down --volumes --rmi all
```

## 🔒 Security Considerations

### 1. Change Default Passwords
- Update `POSTGRES_PASSWORD` in `.env`
- Update `SECRET_KEY` and `JWT_SECRET_KEY`

### 2. Configure Firewall
```bash
# Allow only necessary ports
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3001
sudo ufw allow 3002
sudo ufw allow 3003
sudo ufw allow 5000
```

### 3. Use HTTPS in Production
- Obtain SSL certificates
- Update Nginx configuration
- Redirect HTTP to HTTPS

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Check what's using the port
sudo lsof -i :5000

# Kill the process
sudo kill -9 <PID>
```

**2. Database Connection Issues**
```bash
# Check database logs
docker-compose logs db

# Restart database
docker-compose restart db
```

**3. Frontend Not Loading**
```bash
# Check if frontend containers are running
docker-compose ps

# Rebuild frontend
docker-compose up --build -d asha-dashboard
```

**4. CORS Errors**
- Update `CORS_ORIGINS` in `.env`
- Restart API service: `docker-compose restart api`

### Reset Everything
```bash
# Stop and remove everything
docker-compose down --volumes --rmi all

# Remove all unused Docker resources
docker system prune -a

# Deploy again
./deploy.sh
```

## 📈 Performance Optimization

### 1. Increase Resources
Edit `docker-compose.yml` to add resource limits:
```yaml
services:
  api:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
```

### 2. Enable Redis Caching
The Redis service is included but not actively used. To enable:
- Update your API to use Redis for caching
- Configure session storage in Redis

### 3. Database Optimization
- Add database indexes for frequently queried fields
- Configure PostgreSQL memory settings
- Use connection pooling

## 🔄 Updates and Maintenance

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose up --build -d
```

### Backup Database
```bash
# Create backup
docker-compose exec db pg_dump -U postgres health_monitoring > backup.sql

# Restore backup
docker-compose exec -T db psql -U postgres health_monitoring < backup.sql
```

### Monitor Resource Usage
```bash
# View resource usage
docker stats

# View disk usage
docker system df
```

## 📞 Support

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify all services are running: `docker-compose ps`
3. Check network connectivity
4. Review this documentation
5. Check Docker and Docker Compose versions

## 🎯 Next Steps

After successful deployment:

1. **Test all functionality** on different devices
2. **Configure monitoring** and alerting
3. **Set up automated backups**
4. **Implement SSL certificates** for HTTPS
5. **Configure domain name** (if using a public server)
6. **Set up CI/CD pipeline** for automated deployments

---

**Happy Deploying! 🚀**
