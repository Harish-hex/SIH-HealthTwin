# Health Monitoring System

A comprehensive digital health monitoring system designed for ASHA workers and health professionals in rural areas. The system includes water quality monitoring, health metrics tracking, and disease prediction using machine learning.

## 🏗️ System Architecture

- **Frontend Applications**: React/TypeScript dashboards for different user roles
- **Backend API**: Flask application with ML-powered predictions
- **Database**: PostgreSQL for data persistence
- **Infrastructure**: Docker containerization with Nginx reverse proxy

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- At least 4GB RAM available
- Ports 80, 5000, 3001, 3002, 3003, 5432, 6379 available

### 1. Clone and Setup
```bash
git clone <repository-url>
cd SIH
```

### 2. Quick Deploy
```bash
# Make scripts executable
chmod +x *.sh

# Start the application
./start.sh
```

### 3. Access Your Application
- **Login Page**: http://localhost:3003/
- **ASHA Dashboard**: http://localhost:3001/
- **Health Worker Dashboard**: http://localhost:3002/
- **API**: http://localhost:5000/

## 📱 Multi-Device Access

To access from other devices on your network:

1. **Setup Network Access**:
   ```bash
   ./network-setup.sh
   ```

2. **Access from Other Devices**:
   Replace `localhost` with your server's IP address:
   - http://YOUR_SERVER_IP:3003/ (Login)
   - http://YOUR_SERVER_IP:3001/ (ASHA Dashboard)
   - http://YOUR_SERVER_IP:3002/ (Health Dashboard)

## 🛠️ Manual Deployment

### 1. Configure Environment
```bash
cp env.example .env
# Edit .env with your configuration
```

### 2. Deploy Services
```bash
# Full deployment
./deploy.sh

# Or manual step-by-step
docker-compose up -d db
docker-compose up -d api
docker-compose up -d asha-dashboard health-dashboard login-page
```

## 📊 Features

### ASHA Worker Dashboard
- Health metrics recording (temperature, blood pressure, oxygen levels)
- Symptom reporting
- Location-based data collection
- Multi-language support (English, Hindi, Bengali, Assamese)
- Real-time chat support

### Health Worker Dashboard
- Comprehensive analytics and reporting
- Disease prediction visualization
- Health alert management
- Worker management
- State-wise statistics

### Backend API
- Water quality analysis with ML predictions
- Health metrics storage and retrieval
- User authentication and authorization
- Real-time data processing
- RESTful API endpoints

## 🔧 Management Commands

### View Status
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
```

### Restart Services
```bash
docker-compose restart
```

### Stop Services
```bash
docker-compose down
```

### Clean Deployment
```bash
docker-compose down --volumes --rmi all
```

## 📁 Project Structure

```
SIH/
├── AshaWorker_dashboard/     # ASHA worker frontend
├── HealthWorker_dashboard/   # Health worker frontend
├── Digital Health Twin/      # Backend API and ML models
│   └── backend/
├── Login pg/                 # Login page
├── nginx/                    # Nginx configuration
├── docker-compose.yml        # Main deployment configuration
├── deploy.sh                 # Deployment script
├── start.sh                  # Quick start script
├── network-setup.sh          # Network configuration
└── DEPLOYMENT.md             # Detailed deployment guide
```

## 🔒 Security

- Environment-based configuration
- CORS protection
- Input validation
- SQL injection prevention
- Secure authentication

## 📈 Performance

- Docker containerization for scalability
- Nginx reverse proxy for load balancing
- PostgreSQL for efficient data storage
- Redis caching (optional)
- Gzip compression

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   sudo lsof -i :5000
   sudo kill -9 <PID>
   ```

2. **Database Connection Issues**
   ```bash
   docker-compose logs db
   docker-compose restart db
   ```

3. **CORS Errors**
   - Update `CORS_ORIGINS` in `.env`
   - Restart API: `docker-compose restart api`

### Reset Everything
```bash
docker-compose down --volumes --rmi all
docker system prune -a
./deploy.sh
```

## 📚 Documentation

- [Detailed Deployment Guide](DEPLOYMENT.md)
- [API Documentation](Digital%20Health%20Twin/backend/README.md)
- [Frontend Documentation](AshaWorker_dashboard/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
1. Check the [troubleshooting section](#-troubleshooting)
2. Review the [deployment guide](DEPLOYMENT.md)
3. Check application logs: `docker-compose logs -f`
4. Open an issue on GitHub

---

**Built with ❤️ for better healthcare in rural communities**
