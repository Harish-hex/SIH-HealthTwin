from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db, WaterQualityRecord, PredictionRecord, HealthAlert, HealthWorker, HealthMetricsRecord, seed_initial_data, save_prediction_record
from model.predict import predict_disease
from sqlalchemy import func
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# CORS configuration
default_origins = 'http://localhost:3000,http://localhost:5173,http://localhost:5174,http://localhost:8081'
cors_origins = os.getenv('CORS_ORIGINS', default_origins).split(',')
CORS(app, origins=cors_origins, supports_credentials=True)

# Database configuration
database_url = os.getenv('DATABASE_URL', f'sqlite:///{os.path.join(os.path.dirname(__file__), "health_monitoring.db")}')
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

# Initialize database
db.init_app(app)

# Create tables and seed data
with app.app_context():
    db.create_all()
    seed_initial_data()

@app.route("/")
def home():

    return {"message": "Smart Health Monitoring API with Database is running!", "endpoints": ["/predict", "/records", "/alerts", "/statistics/<state>", "/workers", "/dashboard", "/auth/login", "/auth/verify"]}

@app.route("/auth/login", methods=["POST"])
def login():
    """Authenticate user and return role-based dashboard URL"""
    try:
        data = request.json
        username = data.get('username', '').strip()
        password = data.get('password', '').strip()
        
        # Simple hardcoded credentials for demo
        # In production, this would use proper password hashing and database lookup
        valid_credentials = {
            'asha001': {'password': 'asha123', 'role': 'ASHA', 'name': 'Priya Sharma', 'worker_id': 'AS001'},
            'asha002': {'password': 'asha456', 'role': 'ASHA', 'name': 'Daisy Lyngdoh', 'worker_id': 'ML001'},
            'health001': {'password': 'health123', 'role': 'PHC', 'name': 'Dr. Rajesh Kumar', 'worker_id': 'PHC001'},
            'health002': {'password': 'health456', 'role': 'ANM', 'name': 'Mary Kom', 'worker_id': 'ANM001'},
            'admin': {'password': 'admin123', 'role': 'ADMIN', 'name': 'System Administrator', 'worker_id': 'ADMIN001'}
        }
        
        if username in valid_credentials and valid_credentials[username]['password'] == password:
            user_info = valid_credentials[username]
            
            # Determine dashboard URL based on role
            if user_info['role'] == 'ASHA':
                dashboard_url = 'http://localhost:5174'  # ASHA dashboard port
            elif user_info['role'] in ['PHC', 'ANM']:
                dashboard_url = 'http://localhost:5173'  # Health worker dashboard port
            elif user_info['role'] == 'ADMIN':
                dashboard_url = 'http://localhost:5173'  # Admin uses health worker dashboard
            else:
                dashboard_url = 'http://localhost:5173'
            
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'user': {
                    'username': username,
                    'name': user_info['name'],
                    'role': user_info['role'],
                    'worker_id': user_info['worker_id']
                },
                'dashboard_url': dashboard_url
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Invalid username or password'
            }), 401
            
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Login error: {str(e)}'
        }), 500

@app.route("/auth/verify", methods=["POST"])
def verify_token():
    """Verify authentication token (for future JWT implementation)"""
    try:
        data = request.json
        token = data.get('token', '')
        
        # For now, just return success
        # In production, this would verify JWT tokens
        return jsonify({
            'success': True,
            'message': 'Token verified'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Verification error: {str(e)}'
        }), 500

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        ph = float(data["ph"])
        turbidity = float(data["turbidity"])
        tds = float(data["tds"])
        people_affected = int(data["people_affected_per_5000"])
        
        # Get additional info if provided
        location = data.get("location", "Unknown")
        state = data.get("state", "Unknown")
        district = data.get("district", "Unknown")
        collected_by = data.get("collected_by", "System")

        # Get prediction
        result = predict_disease(ph, turbidity, tds, people_affected)
        
        # Prepare data for database save
        water_data = {
            'ph': ph,
            'turbidity': turbidity,
            'tds': tds,
            'people_affected_per_5000': people_affected
        }
        
        additional_info = {
            'location': location,
            'state': state,
            'district': district,
            'collected_by': collected_by
        }
        
        # Save to database
        saved_record = save_prediction_record(water_data, result, additional_info)
        
        # Add record ID to response
        if saved_record:
            result['record_id'] = saved_record['id']
            result['saved_to_database'] = True
        else:
            result['saved_to_database'] = False
            
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/records", methods=["GET"])
def get_records():
    """Get recent prediction records"""
    try:
        limit = request.args.get('limit', 50, type=int)
        state_filter = request.args.get('state', None)
        
        # Build query
        query = db.session.query(PredictionRecord, WaterQualityRecord)\
            .join(WaterQualityRecord)
        
        # Apply state filter if provided
        if state_filter:
            query = query.filter(WaterQualityRecord.state == state_filter)
        
        # Order and limit
        records = query.order_by(PredictionRecord.timestamp.desc()).limit(limit).all()
        
        result = []
        for pred, water in records:
            result.append({
                'id': pred.id,
                'predicted_disease': pred.predicted_disease,
                'health_alert': pred.health_alert,
                'timestamp': pred.timestamp.isoformat(),
                'water_quality': {
                    'ph': water.ph,
                    'turbidity': water.turbidity,
                    'tds': water.tds,
                    'people_affected': water.people_affected_per_5000,
                    'location': water.location,
                    'state': water.state,
                    'district': water.district,
                    'collected_by': water.collected_by
                }
            })
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/alerts", methods=["GET"])
def get_alerts():
    """Get active health alerts"""
    try:
        status_filter = request.args.get('status', 'ACTIVE')
        state_filter = request.args.get('state', None)
        
        # Build query with explicit joins
        query = db.session.query(HealthAlert, PredictionRecord, WaterQualityRecord)\
            .join(PredictionRecord, HealthAlert.prediction_id == PredictionRecord.id)\
            .join(WaterQualityRecord, PredictionRecord.water_quality_id == WaterQualityRecord.id)\
            .filter(HealthAlert.status == status_filter)
        
        # Apply state filter if provided
        if state_filter:
            query = query.filter(WaterQualityRecord.state == state_filter)
        
        alerts = query.order_by(HealthAlert.created_at.desc()).all()
        
        result = []
        for alert, pred, water in alerts:
            result.append({
                'id': alert.id,
                'alert_level': alert.alert_level,
                'status': alert.status,
                'created_at': alert.created_at.isoformat(),
                'notes': alert.notes,
                'prediction': {
                    'disease': pred.predicted_disease,
                    'health_alert': pred.health_alert
                },
                'location': {
                    'state': water.state,
                    'district': water.district,
                    'location': water.location
                },
                'assigned_worker': alert.assigned_worker.to_dict() if alert.assigned_worker else None
            })
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/statistics/<state>", methods=["GET"])
def get_state_statistics(state):
    """Get health statistics for a state"""
    try:
        # Count of records by disease type
        stats = db.session.query(
            PredictionRecord.predicted_disease,
            func.count(PredictionRecord.id).label('count'),
            func.avg(WaterQualityRecord.ph).label('avg_ph'),
            func.avg(WaterQualityRecord.turbidity).label('avg_turbidity'),
            func.avg(WaterQualityRecord.tds).label('avg_tds')
        ).join(WaterQualityRecord)\
         .filter(WaterQualityRecord.state == state)\
         .group_by(PredictionRecord.predicted_disease)\
         .all()
        
        result = []
        for stat in stats:
            result.append({
                'disease': stat.predicted_disease,
                'count': stat.count,
                'avg_ph': round(stat.avg_ph, 2) if stat.avg_ph else None,
                'avg_turbidity': round(stat.avg_turbidity, 2) if stat.avg_turbidity else None,
                'avg_tds': round(stat.avg_tds, 2) if stat.avg_tds else None
            })
        
        return jsonify({
            'state': state,
            'statistics': result,
            'total_records': sum(stat.count for stat in stats)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/workers", methods=["GET"])
def get_health_workers():
    """Get all health workers"""
    try:
        state_filter = request.args.get('state', None)
        
        query = HealthWorker.query.filter(HealthWorker.is_active == True)
        
        if state_filter:
            query = query.filter(HealthWorker.state == state_filter)
        
        workers = query.all()
        result = [worker.to_dict() for worker in workers]
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/dashboard", methods=["GET"])
def get_dashboard_data():
    """Get comprehensive dashboard data"""
    try:
        # Summary statistics
        total_records = PredictionRecord.query.count()
        active_alerts = HealthAlert.query.filter(HealthAlert.status == 'ACTIVE').count()
        total_workers = HealthWorker.query.filter(HealthWorker.is_active == True).count()
        
        # Disease breakdown
        disease_stats = db.session.query(
            PredictionRecord.predicted_disease,
            func.count(PredictionRecord.id).label('count')
        ).group_by(PredictionRecord.predicted_disease).all()
        
        # State-wise breakdown - simplified query
        state_stats = db.session.query(
            WaterQualityRecord.state,
            func.count(PredictionRecord.id).label('total_predictions')
        ).join(PredictionRecord)\
         .group_by(WaterQualityRecord.state)\
         .all()
        
        # Calculate disease predictions separately for each state
        state_breakdown = []
        for state_stat in state_stats:
            disease_count = db.session.query(func.count(PredictionRecord.id))\
                .join(WaterQualityRecord)\
                .filter(WaterQualityRecord.state == state_stat.state)\
                .filter(PredictionRecord.predicted_disease != 'None')\
                .scalar()
            
            state_breakdown.append({
                'state': state_stat.state,
                'total_predictions': state_stat.total_predictions,
                'disease_predictions': disease_count or 0
            })
        
        return jsonify({
            'summary': {
                'total_records': total_records,
                'active_alerts': active_alerts,
                'total_workers': total_workers
            },
            'disease_breakdown': [{'disease': d.predicted_disease, 'count': d.count} for d in disease_stats],
            'state_breakdown': state_breakdown
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Health Metrics Endpoints
@app.route('/health-metrics', methods=['POST'])
def submit_health_metrics():
    """Submit health metrics data from ASHA workers"""
    try:
        data = request.get_json()
        
        # Create new health metrics record
        health_record = HealthMetricsRecord(
            temperature=float(data.get('temperature')) if data.get('temperature') else None,
            systolic_bp=int(data.get('systolic_bp')) if data.get('systolic_bp') else None,
            diastolic_bp=int(data.get('diastolic_bp')) if data.get('diastolic_bp') else None,
            blood_oxygen=float(data.get('blood_oxygen')) if data.get('blood_oxygen') else None,
            patient_name=data.get('patient_name'),
            patient_age=int(data.get('patient_age')) if data.get('patient_age') else None,
            patient_gender=data.get('patient_gender'),
            location=data.get('location'),
            state=data.get('state'),
            district=data.get('district'),
            recorded_by=data.get('recorded_by'),
            notes=data.get('notes')
        )
        
        db.session.add(health_record)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Health metrics recorded successfully',
            'record_id': health_record.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@app.route('/health-metrics', methods=['GET'])
def get_health_metrics():
    """Get all health metrics records"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 50, type=int)
        state = request.args.get('state')
        district = request.args.get('district')
        
        query = HealthMetricsRecord.query
        
        if state:
            query = query.filter(HealthMetricsRecord.state == state)
        if district:
            query = query.filter(HealthMetricsRecord.district == district)
            
        records = query.order_by(HealthMetricsRecord.timestamp.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'records': [record.to_dict() for record in records.items],
            'total': records.total,
            'pages': records.pages,
            'current_page': page
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/health-metrics/stats', methods=['GET'])
def get_health_metrics_stats():
    """Get health metrics statistics"""
    try:
        state = request.args.get('state')
        
        query = HealthMetricsRecord.query
        if state:
            query = query.filter(HealthMetricsRecord.state == state)
            
        total_records = query.count()
        
        # Average metrics
        avg_temp = db.session.query(func.avg(HealthMetricsRecord.temperature)).filter(
            HealthMetricsRecord.temperature.isnot(None)
        ).scalar() or 0
        
        avg_systolic = db.session.query(func.avg(HealthMetricsRecord.systolic_bp)).filter(
            HealthMetricsRecord.systolic_bp.isnot(None)
        ).scalar() or 0
        
        avg_diastolic = db.session.query(func.avg(HealthMetricsRecord.diastolic_bp)).filter(
            HealthMetricsRecord.diastolic_bp.isnot(None)
        ).scalar() or 0
        
        avg_oxygen = db.session.query(func.avg(HealthMetricsRecord.blood_oxygen)).filter(
            HealthMetricsRecord.blood_oxygen.isnot(None)
        ).scalar() or 0
        
        # Recent records (last 7 days)
        from datetime import datetime, timedelta
        week_ago = datetime.utcnow() - timedelta(days=7)
        recent_records = query.filter(HealthMetricsRecord.timestamp >= week_ago).count()
        
        return jsonify({
            'total_records': total_records,
            'recent_records': recent_records,
            'average_metrics': {
                'temperature': round(avg_temp, 1),
                'systolic_bp': round(avg_systolic, 1),
                'diastolic_bp': round(avg_diastolic, 1),
                'blood_oxygen': round(avg_oxygen, 1)
            }
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/health-metrics/symptom-stats', methods=['GET'])
def get_symptom_statistics():
    """Get symptom statistics from health metrics"""
    try:
        state = request.args.get('state')
        
        query = HealthMetricsRecord.query
        if state:
            query = query.filter(HealthMetricsRecord.state == state)
        
        # Get all records with notes (symptoms)
        records_with_notes = query.filter(HealthMetricsRecord.notes.isnot(None)).all()
        
        # Count symptoms
        symptom_counts = {}
        for record in records_with_notes:
            if record.notes and record.notes.startswith('Symptom: '):
                symptom = record.notes.replace('Symptom: ', '').strip()
                if symptom:
                    symptom_counts[symptom] = symptom_counts.get(symptom, 0) + 1
        
        # Sort by count (descending)
        sorted_symptoms = sorted(symptom_counts.items(), key=lambda x: x[1], reverse=True)
        
        # Convert to list of objects
        symptom_stats = [
            {'symptom': symptom, 'count': count} 
            for symptom, count in sorted_symptoms
        ]
        
        return jsonify({
            'symptom_statistics': symptom_stats,
            'total_symptom_records': sum(symptom_counts.values())
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/health-metrics/<int:record_id>', methods=['DELETE'])
def delete_health_metrics_record(record_id):
    """Delete a specific health metrics record"""
    try:
        record = HealthMetricsRecord.query.get(record_id)
        
        if not record:
            return jsonify({"error": "Record not found"}), 404
        
        db.session.delete(record)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Health metrics record deleted successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    host = os.getenv('HOST', '0.0.0.0')
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'
    
    # For Render deployment
    if os.getenv('RENDER'):
        app.run(host=host, port=port, debug=False)
    else:
        app.run(host=host, port=port, debug=debug)
