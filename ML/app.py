from flask import Flask, request, jsonify
import numpy as np
import requests
import pickle
from flask_cors import CORS

# Importing model
model = pickle.load(open('model.pkl', 'rb'))

# Creating Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route("/")
def home():
    return {"message": "Hello from backend"}

@app.route("/predict", methods=['POST'])
def predict():
    try:
        data = request.json  # Accept JSON data from the request
        
        # Check if required fields are in the data
        required_fields = ['Nitrogen', 'Phosphorus', 'Potassium', 'Temperature', 'Humidity', 'pH', 'Rainfall', 'id']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing {field} field"}), 400

        # Extract features and ensure they're in numeric format
        try:
            N = float(data['Nitrogen'])
            P = float(data['Phosphorus'])
            K = float(data['Potassium'])
            temp = float(data['Temperature'])
            humidity = float(data['Humidity'])
            ph = float(data['pH'])
            rainfall = float(data['Rainfall'])
            id = data['id']
        except ValueError as e:
            return jsonify({"error": f"Invalid input data: {e}"}), 400

        features = np.array([[N, P, K, temp, humidity, ph, rainfall]])

        # Crop dictionary for predicted labels
        crop_dict = {
            1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
            8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
            14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
            19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
        }

        # Get prediction probabilities
        prediction = model.predict_proba(features)

        # Get the top 5 predicted crops
        top5_classes = np.argsort(prediction[0])[-5:]
        top5_crops = [crop_dict[idx + 1] for idx in top5_classes]
        top5_crops.reverse()  # Reverse to have the highest probability crop first

        # Create JSON response for the predicted crops
        result = {
            "message": "Prediction successful",
            "id": id,
            "Crop1": top5_crops[0],
            "Crop2": top5_crops[1],
            "Crop3": top5_crops[2],
            "Crop4": top5_crops[3],
            "Crop5": top5_crops[4],
        }

        # Making a POST request to your Crop API to save the data
        crop_api_url = "http://localhost:4999/crop"
        crop_data = {
            "id": id,
            "Crop1": top5_crops[0],
            "Crop2": top5_crops[1],
            "Crop3": top5_crops[2],
            "Crop4": top5_crops[3],
            "Crop5": top5_crops[4]
        }
        
        try:
            crop_response = requests.post(crop_api_url, json=crop_data)
            if crop_response.status_code == 200:
                print("Crop data saved successfully")
            else:
                print(f"Failed to save crop data: {crop_response.text}")
        except requests.exceptions.RequestException as e:
            print(f"Error while saving crop data: {e}")
            return jsonify({"error": "Failed to connect to the Crop API"}), 500

        # Return JSON response with prediction results
        return jsonify(result)

    except Exception as e:
        # Log any other exceptions that occur
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred while processing the prediction."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)  # Set the port to 5002
