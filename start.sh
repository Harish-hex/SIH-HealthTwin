#!/bin/bash

# Quick Start Script for Health Monitoring System
# This script provides an easy way to start the application

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

echo "🏥 Health Monitoring System - Quick Start"
echo "========================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from template..."
    cp env.example .env
    print_warning "Please update .env file with your configuration!"
    print_warning "Especially change the SECRET_KEY and JWT_SECRET_KEY!"
    read -p "Press Enter after updating .env file..."
fi

# Ask user what they want to do
echo ""
echo "What would you like to do?"
echo "1. Deploy everything (recommended for first time)"
echo "2. Start existing deployment"
echo "3. Setup network for multi-device access"
echo "4. View application status"
echo "5. Stop all services"
echo "6. Clean deployment (remove everything)"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        print_status "Deploying everything..."
        ./deploy.sh
        ;;
    2)
        print_status "Starting existing deployment..."
        docker-compose up -d
        print_success "Services started!"
        ;;
    3)
        print_status "Setting up network for multi-device access..."
        ./network-setup.sh
        ;;
    4)
        print_status "Checking application status..."
        echo ""
        echo "📊 Service Status:"
        docker-compose ps
        echo ""
        echo "🔗 Access URLs:"
        echo "   • Login Page:     http://localhost:3003/"
        echo "   • ASHA Dashboard: http://localhost:3001/"
        echo "   • Health Dashboard: http://localhost:3002/"
        echo "   • API:            http://localhost:5000/"
        ;;
    5)
        print_status "Stopping all services..."
        docker-compose down
        print_success "All services stopped!"
        ;;
    6)
        print_warning "This will remove all data and containers!"
        read -p "Are you sure? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_status "Cleaning deployment..."
            docker-compose down --volumes --rmi all
            print_success "Cleanup completed!"
        else
            print_status "Cleanup cancelled."
        fi
        ;;
    *)
        print_error "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
print_success "Operation completed!"
echo ""
echo "📚 For more information, see DEPLOYMENT.md"
echo "🐛 For troubleshooting, check the logs: docker-compose logs -f"
