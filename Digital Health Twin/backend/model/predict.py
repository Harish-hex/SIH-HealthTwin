import os
import joblib
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "health_model.pkl")

# Load model
model = joblib.load(MODEL_PATH)

def predict_disease(ph, turbidity, tds, people_affected):
    features = np.array([[ph, turbidity, tds, people_affected]])
    prediction = model.predict(features)[0]

    # Create health alert based on prediction
    if prediction == "None":
        alert = "Safe – No immediate outbreak risk."
    else:
        alert = f"Outbreak risk detected: {prediction}"

    return {
        "predicted_disease": prediction,
        "health_alert": alert
    }
