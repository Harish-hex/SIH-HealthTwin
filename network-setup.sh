#!/bin/bash

# Network Setup Script for Multi-Device Access
# This script helps configure the network for accessing the application from other devices

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo "🌐 Health Monitoring System - Network Setup"
echo "=========================================="

# Get the server's IP address
print_status "Detecting server IP address..."

# Try different methods to get IP
if command -v ip &> /dev/null; then
    SERVER_IP=$(ip route get 1.1.1.1 | awk '{print $7; exit}')
elif command -v ifconfig &> /dev/null; then
    SERVER_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}')
else
    print_error "Could not detect IP address automatically"
    read -p "Please enter your server's IP address: " SERVER_IP
fi

if [ -z "$SERVER_IP" ]; then
    print_error "Could not detect IP address"
    read -p "Please enter your server's IP address: " SERVER_IP
fi

print_success "Server IP detected: $SERVER_IP"

# Update .env file with the detected IP
if [ -f .env ]; then
    print_status "Updating .env file with server IP..."
    
    # Backup original .env
    cp .env .env.backup
    
    # Update CORS_ORIGINS
    sed -i.bak "s|CORS_ORIGINS=.*|CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:5174,http://localhost:8081,http://localhost:80,http://localhost:443,http://$SERVER_IP:3001,http://$SERVER_IP:3002,http://$SERVER_IP:3003,http://$SERVER_IP:5000|" .env
    
    print_success "Updated .env file with server IP"
else
    print_warning ".env file not found. Please create it from env.example first"
    exit 1
fi

# Check if ports are available
print_status "Checking port availability..."

PORTS=(80 5000 3001 3002 3003 5432 6379)
for port in "${PORTS[@]}"; do
    if lsof -i :$port > /dev/null 2>&1; then
        print_warning "Port $port is already in use"
    else
        print_success "Port $port is available"
    fi
done

# Display access information
echo ""
print_success "🎉 Network setup completed!"
echo ""
echo "📱 Access your application from any device on the network:"
echo "   • Login Page:     http://$SERVER_IP:3003/"
echo "   • ASHA Dashboard: http://$SERVER_IP:3001/"
echo "   • Health Dashboard: http://$SERVER_IP:3002/"
echo "   • API:            http://$SERVER_IP:5000/"
echo ""
echo "🔧 Next steps:"
echo "   1. Restart the services: docker-compose restart"
echo "   2. Test access from another device"
echo "   3. If using a firewall, ensure ports are open"
echo ""
echo "🛡️  Firewall configuration (if needed):"
echo "   sudo ufw allow 80"
echo "   sudo ufw allow 5000"
echo "   sudo ufw allow 3001"
echo "   sudo ufw allow 3002"
echo "   sudo ufw allow 3003"
echo ""

# Ask if user wants to restart services
read -p "Do you want to restart the services now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Restarting services..."
    docker-compose restart
    print_success "Services restarted successfully!"
fi

print_success "Setup complete! Your application is now accessible from other devices."
