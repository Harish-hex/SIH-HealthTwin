# Deploy to Render - Health Monitoring System

This guide will help you deploy your Health Monitoring System to Render, a cloud platform that makes it easy to deploy full-stack applications.

## 🚀 Why Render?

- **Easy Deployment**: Simple configuration files
- **Free Tier**: Perfect for development and small projects
- **PostgreSQL Database**: Built-in database support
- **Custom Domains**: Easy to set up custom domains
- **Auto-deploy**: Automatic deployments from Git
- **SSL Certificates**: Automatic HTTPS

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Domain (Optional)**: For custom domain setup

## 🏗️ Architecture on Render

Your application will be deployed as separate services:

1. **Backend API** (Web Service)
2. **PostgreSQL Database** (Database Service)
3. **ASHA Dashboard** (Static Site)
4. **Health Worker Dashboard** (Static Site)
5. **Login Page** (Static Site)

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Verify the following files exist**:
   - `Digital Health Twin/backend/render.yaml`
   - `AshaWorker_dashboard/render.yaml`
   - `HealthWorker_dashboard/render.yaml`
   - `Login pg/render.yaml`

### Step 2: Deploy the Database

1. **Go to Render Dashboard**
2. **Click "New +" → "PostgreSQL"**
3. **Configure Database**:
   - **Name**: `health-monitoring-db`
   - **Database**: `health_monitoring`
   - **User**: `health_user`
   - **Plan**: Free (or Starter for production)
4. **Click "Create Database"**
5. **Note the connection details** (you'll need these later)

### Step 3: Deploy the Backend API

1. **Click "New +" → "Web Service"**
2. **Connect your GitHub repository**
3. **Configure the service**:
   - **Name**: `health-monitoring-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT app:app`
   - **Root Directory**: `Digital Health Twin/backend`

4. **Add Environment Variables**:
   ```
   FLASK_ENV=production
   DATABASE_URL=<from your database service>
   SECRET_KEY=<generate a strong secret key>
   CORS_ORIGINS=https://your-asha-dashboard.onrender.com,https://your-health-dashboard.onrender.com,https://your-login-page.onrender.com
   HOST=0.0.0.0
   PORT=10000
   ```

5. **Click "Create Web Service"**

### Step 4: Deploy Frontend Applications

#### ASHA Worker Dashboard

1. **Click "New +" → "Static Site"**
2. **Connect your GitHub repository**
3. **Configure**:
   - **Name**: `asha-worker-dashboard`
   - **Root Directory**: `AshaWorker_dashboard`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variables**:
   ```
   VITE_API_URL=https://health-monitoring-api.onrender.com
   VITE_LOGIN_URL=https://health-monitoring-login.onrender.com
   ```

5. **Click "Create Static Site"**

#### Health Worker Dashboard

1. **Click "New +" → "Static Site"**
2. **Configure**:
   - **Name**: `health-worker-dashboard`
   - **Root Directory**: `HealthWorker_dashboard`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Add Environment Variables**:
   ```
   VITE_API_URL=https://health-monitoring-api.onrender.com
   VITE_LOGIN_URL=https://health-monitoring-login.onrender.com
   ```

4. **Click "Create Static Site"**

#### Login Page

1. **Click "New +" → "Static Site"**
2. **Configure**:
   - **Name**: `health-monitoring-login`
   - **Root Directory**: `Login pg`
   - **Publish Directory**: `./`

3. **Add Environment Variables**:
   ```
   VITE_API_URL=https://health-monitoring-api.onrender.com
   ```

4. **Click "Create Static Site"**

### Step 5: Update CORS Settings

After all services are deployed, update the CORS_ORIGINS in your backend API:

1. **Go to your API service**
2. **Go to Environment tab**
3. **Update CORS_ORIGINS** with your actual Render URLs:
   ```
   https://asha-worker-dashboard.onrender.com,https://health-worker-dashboard.onrender.com,https://health-monitoring-login.onrender.com
   ```
4. **Save changes**

## 🔧 Alternative: Using render.yaml (Recommended)

Instead of manual deployment, you can use the `render.yaml` files for automatic deployment:

### 1. Create a render.yaml in your root directory:

```yaml
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
```

### 2. Deploy using Blueprint:

1. **Go to Render Dashboard**
2. **Click "New +" → "Blueprint"**
3. **Connect your GitHub repository**
4. **Render will automatically detect the render.yaml**
5. **Click "Apply"**

## 🌐 Access Your Application

After deployment, your application will be available at:

- **Login Page**: `https://health-monitoring-login.onrender.com`
- **ASHA Dashboard**: `https://asha-worker-dashboard.onrender.com`
- **Health Dashboard**: `https://health-worker-dashboard.onrender.com`
- **API**: `https://health-monitoring-api.onrender.com`

## 🔧 Environment Variables

### Backend API
```
FLASK_ENV=production
DATABASE_URL=<from database service>
SECRET_KEY=<generate strong key>
CORS_ORIGINS=https://your-frontend-urls.onrender.com
HOST=0.0.0.0
PORT=10000
```

### Frontend Applications
```
VITE_API_URL=https://health-monitoring-api.onrender.com
VITE_LOGIN_URL=https://health-monitoring-login.onrender.com
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check build logs in Render dashboard
   - Ensure all dependencies are in requirements.txt
   - Verify build commands are correct

2. **Database Connection Issues**:
   - Verify DATABASE_URL is correct
   - Check if database service is running
   - Ensure database is accessible from API service

3. **CORS Errors**:
   - Update CORS_ORIGINS with correct URLs
   - Restart API service after updating environment variables

4. **Frontend Not Loading**:
   - Check if API URL is correct in environment variables
   - Verify static site build was successful
   - Check browser console for errors

### Debugging Steps

1. **Check Logs**:
   - Go to your service in Render dashboard
   - Click on "Logs" tab
   - Look for error messages

2. **Test API Endpoints**:
   ```bash
   curl https://health-monitoring-api.onrender.com/
   ```

3. **Check Database Connection**:
   - Go to database service
   - Check connection status
   - Verify tables are created

## 📈 Scaling and Production

### Upgrade Plans

- **Free Tier**: Good for development and testing
- **Starter Plan**: Better for production with more resources
- **Professional Plan**: For high-traffic applications

### Custom Domains

1. **Go to your service**
2. **Click "Settings"**
3. **Add your custom domain**
4. **Update DNS records as instructed**

### SSL Certificates

- **Automatic**: Render provides free SSL certificates
- **Custom**: You can upload your own certificates

## 🔄 Updates and Maintenance

### Automatic Deployments

- **Enabled by default**: Changes to main branch trigger automatic deployment
- **Manual deployment**: You can trigger manual deployments from dashboard

### Database Backups

- **Automatic**: Render provides automatic backups
- **Manual**: You can create manual backups from dashboard

### Monitoring

- **Uptime monitoring**: Built-in uptime monitoring
- **Performance metrics**: Available in dashboard
- **Logs**: Real-time log viewing

## 💰 Cost Estimation

### Free Tier (Development)
- **Web Services**: 750 hours/month free
- **Database**: 1GB storage, 1GB RAM
- **Static Sites**: Unlimited
- **Bandwidth**: 100GB/month

### Starter Plan (Production)
- **Web Services**: $7/month per service
- **Database**: $7/month
- **Static Sites**: Free
- **Bandwidth**: 100GB/month included

## 🎯 Next Steps

After successful deployment:

1. **Test all functionality** on the live URLs
2. **Set up monitoring** and alerting
3. **Configure custom domain** (optional)
4. **Set up CI/CD** for automatic deployments
5. **Monitor performance** and optimize as needed

---

**Your Health Monitoring System is now live on Render! 🚀**
