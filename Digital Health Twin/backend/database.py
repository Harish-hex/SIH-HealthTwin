import os
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

# SQLAlchemy instance
db = SQLAlchemy()

# Models
class WaterQualityRecord(db.Model):
    __tablename__ = 'water_quality_records'
    
    id = db.Column(db.Integer, primary_key=True)
    ph = db.Column(db.Float, nullable=False)
    turbidity = db.Column(db.Float, nullable=False)
    tds = db.Column(db.Float, nullable=False)
    people_affected_per_5000 = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(100), nullable=True)
    state = db.Column(db.String(50), nullable=True)
    district = db.Column(db.String(50), nullable=True)
    collected_by = db.Column(db.String(100), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'ph': self.ph,
            'turbidity': self.turbidity,
            'tds': self.tds,
            'people_affected_per_5000': self.people_affected_per_5000,
            'location': self.location,
            'state': self.state,
            'district': self.district,
            'collected_by': self.collected_by,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }

class PredictionRecord(db.Model):
    __tablename__ = 'prediction_records'
    
    id = db.Column(db.Integer, primary_key=True)
    water_quality_id = db.Column(db.Integer, db.ForeignKey('water_quality_records.id'), nullable=False)
    predicted_disease = db.Column(db.String(100), nullable=False)
    health_alert = db.Column(db.Text, nullable=False)
    confidence_score = db.Column(db.Float, nullable=True)
    model_version = db.Column(db.String(20), default='1.0')
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship
    water_quality = db.relationship('WaterQualityRecord', backref='predictions')
    
    def to_dict(self):
        return {
            'id': self.id,
            'water_quality_id': self.water_quality_id,
            'predicted_disease': self.predicted_disease,
            'health_alert': self.health_alert,
            'confidence_score': self.confidence_score,
            'model_version': self.model_version,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'water_quality': self.water_quality.to_dict() if self.water_quality else None
        }

class HealthWorker(db.Model):
    __tablename__ = 'health_workers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    worker_id = db.Column(db.String(50), unique=True, nullable=False)
    role = db.Column(db.String(50), nullable=False)  # ASHA, ANM, PHC, etc.
    state = db.Column(db.String(50), nullable=False)
    district = db.Column(db.String(50), nullable=False)
    contact_phone = db.Column(db.String(15), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'worker_id': self.worker_id,
            'role': self.role,
            'state': self.state,
            'district': self.district,
            'contact_phone': self.contact_phone,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class HealthAlert(db.Model):
    __tablename__ = 'health_alerts'
    
    id = db.Column(db.Integer, primary_key=True)
    prediction_id = db.Column(db.Integer, db.ForeignKey('prediction_records.id'), nullable=False)
    alert_level = db.Column(db.String(20), nullable=False)  # LOW, MEDIUM, HIGH
    status = db.Column(db.String(20), default='ACTIVE')  # ACTIVE, RESOLVED, INVESTIGATING
    assigned_to = db.Column(db.Integer, db.ForeignKey('health_workers.id'), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    prediction = db.relationship('PredictionRecord', backref='alerts')
    assigned_worker = db.relationship('HealthWorker', backref='assigned_alerts')
    
    def to_dict(self):
        return {
            'id': self.id,
            'prediction_id': self.prediction_id,
            'alert_level': self.alert_level,
            'status': self.status,
            'assigned_to': self.assigned_to,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'prediction': self.prediction.to_dict() if self.prediction else None,
            'assigned_worker': self.assigned_worker.to_dict() if self.assigned_worker else None
        }

class HealthMetricsRecord(db.Model):
    __tablename__ = 'health_metrics_records'
    
    id = db.Column(db.Integer, primary_key=True)
    temperature = db.Column(db.Float, nullable=True)  # in Celsius
    systolic_bp = db.Column(db.Integer, nullable=True)  # systolic blood pressure
    diastolic_bp = db.Column(db.Integer, nullable=True)  # diastolic blood pressure
    blood_oxygen = db.Column(db.Float, nullable=True)  # blood oxygen percentage
    patient_name = db.Column(db.String(100), nullable=True)
    patient_age = db.Column(db.Integer, nullable=True)
    patient_gender = db.Column(db.String(10), nullable=True)
    location = db.Column(db.String(100), nullable=True)
    state = db.Column(db.String(50), nullable=True)
    district = db.Column(db.String(50), nullable=True)
    recorded_by = db.Column(db.String(100), nullable=True)  # ASHA worker ID
    notes = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'temperature': self.temperature,
            'systolic_bp': self.systolic_bp,
            'diastolic_bp': self.diastolic_bp,
            'blood_oxygen': self.blood_oxygen,
            'patient_name': self.patient_name,
            'patient_age': self.patient_age,
            'patient_gender': self.patient_gender,
            'location': self.location,
            'state': self.state,
            'district': self.district,
            'recorded_by': self.recorded_by,
            'notes': self.notes,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }

# Database utility functions
def seed_initial_data():
    """Add initial health workers data if tables are empty"""
    if HealthWorker.query.count() == 0:
        sample_workers = [
            HealthWorker(name="Priya Sharma", worker_id="AS001", role="ASHA", state="Assam", district="Guwahati", contact_phone="+91-9876543210"),
            HealthWorker(name="Tenzin Norbu", worker_id="AP001", role="PHC", state="Arunachal Pradesh", district="Itanagar", contact_phone="+91-9876543211"),
            HealthWorker(name="Mary Kom", worker_id="MN001", role="ANM", state="Manipur", district="Imphal", contact_phone="+91-9876543212"),
            HealthWorker(name="Daisy Lyngdoh", worker_id="ML001", role="ASHA", state="Meghalaya", district="Shillong", contact_phone="+91-9876543213"),
            HealthWorker(name="Lalrinsanga", worker_id="MZ001", role="PHC", state="Mizoram", district="Aizawl", contact_phone="+91-9876543214"),
            HealthWorker(name="Naga Ao", worker_id="NL001", role="ANM", state="Nagaland", district="Kohima", contact_phone="+91-9876543215"),
            HealthWorker(name="Pema Tshering", worker_id="SK001", role="ASHA", state="Sikkim", district="Gangtok", contact_phone="+91-9876543216"),
            HealthWorker(name="Biplab Debbarma", worker_id="TR001", role="PHC", state="Tripura", district="Agartala", contact_phone="+91-9876543217"),
        ]
        
        for worker in sample_workers:
            db.session.add(worker)
        
        try:
            db.session.commit()
            print("✅ Initial health workers data seeded successfully")
        except Exception as e:
            db.session.rollback()
            print(f"❌ Error seeding initial data: {e}")

def determine_alert_level(disease):
    """Determine alert level based on disease type"""
    high_risk_diseases = ['Cholera', 'Typhoid']
    if disease in high_risk_diseases:
        return 'HIGH'
    elif disease == 'Diarrhea':
        return 'MEDIUM'
    else:
        return 'LOW'

def save_prediction_record(water_data, prediction_result, additional_info=None):
    """Save water quality data and prediction to database"""
    try:
        # Save water quality record
        water_record = WaterQualityRecord(
            ph=water_data['ph'],
            turbidity=water_data['turbidity'],
            tds=water_data['tds'],
            people_affected_per_5000=water_data['people_affected_per_5000'],
            location=additional_info.get('location') if additional_info else None,
            state=additional_info.get('state') if additional_info else None,
            district=additional_info.get('district') if additional_info else None,
            collected_by=additional_info.get('collected_by') if additional_info else None
        )
        db.session.add(water_record)
        db.session.flush()  # Get the ID
        
        # Save prediction record
        prediction_record = PredictionRecord(
            water_quality_id=water_record.id,
            predicted_disease=prediction_result['predicted_disease'],
            health_alert=prediction_result['health_alert'],
            confidence_score=prediction_result.get('confidence_score')
        )
        db.session.add(prediction_record)
        db.session.flush()
        
        # Create alert if disease predicted
        if prediction_result['predicted_disease'] != 'None':
            alert_level = determine_alert_level(prediction_result['predicted_disease'])
            alert = HealthAlert(
                prediction_id=prediction_record.id,
                alert_level=alert_level,
                status='ACTIVE'
            )
            db.session.add(alert)
        
        db.session.commit()
        return prediction_record.to_dict()
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error saving prediction record: {e}")
        return None
