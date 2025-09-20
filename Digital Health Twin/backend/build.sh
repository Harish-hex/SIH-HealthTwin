#!/usr/bin/env bash
# Build script for Render deployment

echo "Building Health Monitoring API for Render..."

# Install dependencies
pip install -r requirements.txt

# Create necessary directories
mkdir -p data

# Set up the database
python -c "
from app import app, db
with app.app_context():
    db.create_all()
    print('Database tables created successfully')
"

echo "Build completed successfully!"
