#!/bin/bash

# Health Monitoring System Deployment Script
# This script deploys the full stack application with database

set -e

echo "🚀 Starting Health Monitoring System Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    print_status "Creating environment file from template..."
    cp env.example .env
    print_warning "Please update .env file with your configuration before continuing."
    print_warning "Especially change the SECRET_KEY and JWT_SECRET_KEY for production!"
    read -p "Press Enter to continue after updating .env file..."
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down --remove-orphans

# Remove old images (optional)
if [ "$1" = "--clean" ]; then
    print_status "Cleaning up old images..."
    docker-compose down --rmi all --volumes --remove-orphans
fi

# Build and start services
print_status "Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Check if services are running
print_status "Checking service health..."

# Check database
if docker-compose exec -T db pg_isready -U postgres > /dev/null 2>&1; then
    print_success "Database is ready"
else
    print_error "Database is not ready"
    exit 1
fi

# Check API
if curl -f http://localhost:5000/ > /dev/null 2>&1; then
    print_success "API is ready"
else
    print_error "API is not ready"
    exit 1
fi

# Check ASHA Dashboard
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    print_success "ASHA Dashboard is ready"
else
    print_warning "ASHA Dashboard might not be ready yet"
fi

# Check Health Dashboard
if curl -f http://localhost:3002/health > /dev/null 2>&1; then
    print_success "Health Dashboard is ready"
else
    print_warning "Health Dashboard might not be ready yet"
fi

# Check Login Page
if curl -f http://localhost:3003/health > /dev/null 2>&1; then
    print_success "Login Page is ready"
else
    print_warning "Login Page might not be ready yet"
fi

# Display access information
echo ""
print_success "🎉 Deployment completed successfully!"
echo ""
echo "📱 Access your application:"
echo "   • Login Page:     http://localhost:3003/"
echo "   • ASHA Dashboard: http://localhost:3001/"
echo "   • Health Dashboard: http://localhost:3002/"
echo "   • API:            http://localhost:5000/"
echo "   • Database:       localhost:5432"
echo ""
echo "🌐 For multi-device access:"
echo "   • Replace 'localhost' with your server's IP address"
echo "   • Example: http://192.168.1.100:3003/"
echo ""
echo "📊 Monitor your application:"
echo "   • View logs: docker-compose logs -f"
echo "   • Stop services: docker-compose down"
echo "   • Restart services: docker-compose restart"
echo ""
print_warning "Remember to update CORS_ORIGINS in .env file with your actual domain/IP for production use!"
