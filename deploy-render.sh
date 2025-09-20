#!/bin/bash

# Render Deployment Script for Health Monitoring System
# This script helps prepare and deploy your application to Render

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

echo "🚀 Health Monitoring System - Render Deployment"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_error "Git repository not found. Please initialize git first:"
    echo "  git init"
    echo "  git add ."
    echo "  git commit -m 'Initial commit'"
    exit 1
fi

# Check if we're on a branch
current_branch=$(git branch --show-current)
if [ -z "$current_branch" ]; then
    print_error "No git branch found. Please create a branch first:"
    echo "  git checkout -b main"
    exit 1
fi

print_success "Git repository found on branch: $current_branch"

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    print_warning "No remote origin found. You'll need to add a GitHub remote:"
    echo "  git remote add origin https://github.com/yourusername/your-repo.git"
    echo ""
    read -p "Do you want to continue without a remote? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create main render.yaml if it doesn't exist
if [ ! -f "render.yaml" ]; then
    print_status "Creating main render.yaml configuration..."
    cat > render.yaml << 'EOF'
services:
  # Backend API
  - type: web
    name: health-monitoring-api
    env: python
    plan: starter
    buildCommand: cd "Digital Health Twin/backend" && pip install -r requirements.txt
    startCommand: cd "Digital Health Twin/backend" && gunicorn --bind 0.0.0.0:$PORT app:app
    envVars:
      - key: FLASK_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: health-monitoring-db
          property: connectionString
      - key: SECRET_KEY
        generateValue: true
      - key: CORS_ORIGINS
        value: https://asha-worker-dashboard.onrender.com,https://health-worker-dashboard.onrender.com,https://health-monitoring-login.onrender.com
      - key: HOST
        value: 0.0.0.0
      - key: PORT
        value: 10000

  # ASHA Dashboard
  - type: web
    name: asha-worker-dashboard
    env: static
    buildCommand: cd AshaWorker_dashboard && npm install && npm run build
    staticPublishPath: AshaWorker_dashboard/dist
    envVars:
      - key: VITE_API_URL
        value: https://health-monitoring-api.onrender.com
      - key: VITE_LOGIN_URL
        value: https://health-monitoring-login.onrender.com

  # Health Dashboard
  - type: web
    name: health-worker-dashboard
    env: static
    buildCommand: cd HealthWorker_dashboard && npm install && npm run build
    staticPublishPath: HealthWorker_dashboard/dist
    envVars:
      - key: VITE_API_URL
        value: https://health-monitoring-api.onrender.com
      - key: VITE_LOGIN_URL
        value: https://health-monitoring-login.onrender.com

  # Login Page
  - type: web
    name: health-monitoring-login
    env: static
    staticPublishPath: Login pg
    envVars:
      - key: VITE_API_URL
        value: https://health-monitoring-api.onrender.com

databases:
  - name: health-monitoring-db
    plan: starter
    databaseName: health_monitoring
    user: health_user
EOF
    print_success "Created main render.yaml"
fi

# Check if all required files exist
print_status "Checking required files..."

required_files=(
    "Digital Health Twin/backend/requirements.txt"
    "Digital Health Twin/backend/app.py"
    "AshaWorker_dashboard/package.json"
    "HealthWorker_dashboard/package.json"
    "Login pg/index.html"
)

missing_files=()
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    print_error "Missing required files:"
    for file in "${missing_files[@]}"; do
        echo "  - $file"
    done
    exit 1
fi

print_success "All required files found"

# Check if we should commit and push
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes."
    echo "Files with changes:"
    git status --porcelain
    echo ""
    read -p "Do you want to commit and push these changes? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Committing changes..."
        git add .
        git commit -m "Prepare for Render deployment"
        
        if git remote get-url origin > /dev/null 2>&1; then
            print_status "Pushing to remote repository..."
            git push origin $current_branch
            print_success "Changes pushed to remote repository"
        else
            print_warning "No remote origin found. Please push manually:"
            echo "  git push origin $current_branch"
        fi
    else
        print_warning "Skipping commit. Make sure to commit and push before deploying to Render."
    fi
else
    print_success "No uncommitted changes found"
fi

# Display next steps
echo ""
print_success "🎉 Preparation completed!"
echo ""
echo "📋 Next steps to deploy to Render:"
echo ""
echo "1. 🌐 Go to https://render.com and sign up/login"
echo ""
echo "2. 📦 Create a new Blueprint:"
echo "   - Click 'New +' → 'Blueprint'"
echo "   - Connect your GitHub repository"
echo "   - Select this repository and branch: $current_branch"
echo "   - Click 'Apply'"
echo ""
echo "3. ⏳ Wait for deployment (5-10 minutes)"
echo ""
echo "4. 🔗 Access your application:"
echo "   - Login Page: https://health-monitoring-login.onrender.com"
echo "   - ASHA Dashboard: https://asha-worker-dashboard.onrender.com"
echo "   - Health Dashboard: https://health-worker-dashboard.onrender.com"
echo "   - API: https://health-monitoring-api.onrender.com"
echo ""
echo "📚 For detailed instructions, see RENDER_DEPLOYMENT.md"
echo ""
print_warning "Note: First deployment may take 10-15 minutes. Subsequent deployments are faster."
