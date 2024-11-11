from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import torch
from torchvision import transforms
from PIL import Image
import torchvision.models as models
import pandas as pd

app = Flask(__name__)
CORS(app)

# Ensure the directory names are correct
MODEL_DIR = os.path.join('backend', 'Model_assest')  # Adjusted for project structure

# Load disease information
try:
    disease_info = pd.read_csv('Model_assest/disease_info.csv')
except FileNotFoundError:
    print("disease_info.csv not found. Ensure the path is correct.")
    exit(1)

# Set device for model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load pretrained model
try:
    model = models.resnet18(pretrained=True)
    model.fc = torch.nn.Linear(model.fc.in_features, 38)  # Assuming 38 classes in the disease info
    model.load_state_dict(torch.load(os.path.join('Model_assest', 'model.pth'), map_location=device))
    model.eval()
except FileNotFoundError:
    print("Model file (model.pth) not found. Ensure the path is correct.")
    exit(1)

# Image transformation
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Prediction function
def prediction(image_path):
    try:
        image = Image.open(image_path)
        image = transform(image).unsqueeze(0).to(device)
        output = model(image)
        index = torch.argmax(output).item()
        return index
    except Exception as e:
        print(f"Error during prediction: {e}")
        return None

# Create uploads directory if not exists
UPLOAD_FOLDER = os.path.join('backend''uploads')  # Adjusted path
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    image = request.files['image']
    if image:
        filename = image.filename
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        image.save(file_path)

        # Run prediction
        pred = prediction(file_path)
        
        if pred is not None:
            # Get disease information from the CSV
            response = {
                'prediction': disease_info['disease_name'][pred],
                'description': disease_info['description'][pred],
                'possible_steps': disease_info['Possible Steps'][pred]
            }
            return jsonify(response)
        else:
            return jsonify({'error': 'Prediction failed'}), 500
    
    return jsonify({'error': 'Invalid request'}), 400

if __name__ == '__main__':
    app.run(debug=True)
