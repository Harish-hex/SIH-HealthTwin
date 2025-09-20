import os
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# ----------------------------
# Dataset (20 rows sample)
# ----------------------------
data = {
    "ph": [
        6.2, 7.5, 8.0, 5.8, 6.9, 7.1, 6.0, 6.7, 5.5, 8.2,
        7.3, 6.4, 7.8, 6.1, 7.0, 8.1, 5.9, 6.6, 7.2, 6.3
    ],
    "turbidity": [
        1.5, 2.8, 7.5, 9.0, 3.2, 4.5, 8.3, 5.0, 10.0, 6.7,
        2.0, 1.8, 6.0, 7.2, 2.5, 8.8, 9.5, 4.0, 3.0, 5.5
    ],
    "tds": [
        250, 600, 1800, 200, 500, 750, 1700, 650, 150, 1900,
        550, 300, 1200, 1600, 450, 1850, 100, 700, 480, 900
    ],
    "people_affected_per_5000": [
        50, 120, 800, 950, 100, 200, 700, 400, 1000, 850,
        90, 60, 600, 750, 80, 900, 980, 300, 150, 500
    ],
    "common_disease": [
        "None", "None", "Cholera", "Cholera", "None", "None", "Typhoid", "Diarrhea", "Cholera", "Typhoid",
        "None", "None", "Diarrhea", "Typhoid", "None", "Cholera", "Cholera", "Diarrhea", "None", "Typhoid"
    ]
}

# Convert to DataFrame
df = pd.DataFrame(data)

# Features and target
X = df[["ph", "turbidity", "tds", "people_affected_per_5000"]]
y = df["common_disease"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Save model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "health_model.pkl")
joblib.dump(model, MODEL_PATH)

print("Model trained and saved at:", MODEL_PATH)

