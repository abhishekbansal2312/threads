# 🌱 KrishiCare - Comprehensive Agricultural Platform

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

![image](https://github.com/user-attachments/assets/2d78104e-b1da-4ca0-a7d3-0a0362e1eef7)

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Key Project Components](#-key-project-components)
- [ML Models](#-ml-models)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Future Enhancements](#-future-enhancements)
- [Contributors](#-contributors)
- [License](#-license)

## 🌟 Overview

KrishiCare is a comprehensive agricultural platform designed to assist farmers and agricultural enthusiasts across India. The application combines social networking capabilities with advanced machine learning models for crop recommendations, plant disease detection, and weather forecasting. By leveraging AI technology, KrishiCare aims to improve agricultural productivity, sustainability, and knowledge sharing among farming communities.

## 🚀 Features

### 🧑‍🤝‍🧑 Social Networking
- User profiles and authentication (signup, login, logout)
- Post creation, sharing, liking, and replying
- Feed customization based on followed users
- Profile viewing and user discovery
- Real-time messaging and conversations
- Account management (update profile, freeze account)

### 🧠 AI-Powered Solutions
- 🌾 Crop recommendation system based on soil and climate parameters
- 🍃 Plant disease detection using image recognition
- 🌡️ Weather forecasting for agricultural planning
- 🧪 Fertilizer recommendation based on crop and soil type

### 📊 Data Analytics
- Agricultural data visualization
- Historical data tracking
- Performance metrics
- Seasonal recommendations

## 🗂️ Project Structure

```
└── KrishiCare/
    ├── backend/                  # Flask backend for disease detection
    │   ├── app.py                # Plant disease detection API
    │   ├── Model_assest/         # ML models and disease information
    │   │   ├── disease_info.csv  # Information about plant diseases
    │   │   └── model.pth         # PyTorch model for disease detection
    │   └── uploads/              # User uploaded plant images
    │
    ├── ML/                       # Machine Learning components
    │   ├── app.py                # Crop recommendation API
    │   ├── model.pkl             # Trained ML model for crop recommendation
    │   ├── minmaxscaler.pkl      # Scaler for data normalization
    │   ├── standscaler.pkl       # Standard scaler for data normalization
    │   └── dataset/              # Training datasets
    │       └── Crop_recommendation.csv  # Dataset for crop recommendations
    │
    ├── server/                   # Node.js server (Main API)
    │   ├── index.js              # Main server entry point
    │   ├── Controllers/          # API controllers
    │   ├── Models/               # Database models
    │   ├── Routes/               # API routes
    │   ├── Middlewares/          # Server middlewares
    │   └── config/               # Database configuration
    │
    ├── Threads-Backend/          # Messaging backend
    │   ├── index.js              # Messaging server entry point
    │   ├── controllers/          # Message controllers
    │   ├── models/               # Message and conversation models
    │   ├── routes/               # Message API routes
    │   ├── socket/               # WebSocket implementation
    │   ├── cron/                 # Scheduled tasks
    │   ├── middlewares/          # Server middlewares
    │   └── utils/                # Utility functions
    │
    └── Threads-Frontend/         # React frontend application
        ├── src/
        │   ├── App.jsx           # Main application component
        │   ├── components/       # UI components
        │   ├── pages/            # Application pages
        │   ├── hooks/            # Custom React hooks
        │   ├── atoms/            # Recoil state atoms
        │   └── context/          # React context providers
        └── public/               # Static assets
```

## 💻 Technologies Used

### Frontend:
- ⚛️ React.js for UI components
- 🔄 Recoil for state management
- 🎨 CSS for styling
- 📱 Responsive design for mobile/desktop

### Backend:
- 🟢 Node.js & Express.js for API development
- 🐍 Python & Flask for ML model deployment
- 🔄 Socket.io for real-time messaging
- 🔒 JWT for authentication

### Database:
- 🍃 MongoDB for data storage
- 🔄 Mongoose for ODM

### Machine Learning:
- 🔮 PyTorch for plant disease detection
- 🌿 ResNet18 model architecture for image classification
- 📊 Scikit-learn for crop recommendation
- 🌱 Random Forest classifier for crop prediction
- 📈 Pandas for data preprocessing

### DevOps:
- 🔄 Git & GitHub for version control

## 💡 Key Project Components

### User Authentication System
The authentication system uses JWT (JSON Web Tokens) for secure authentication and session management. It includes:

- User registration with validation
- Secure login with password hashing
- Token generation and validation
- Route protection middleware
- Account freezing functionality

### Social Networking Features
The social networking component enables community building among farmers:

- Follow/unfollow system to connect with other users
- Feed algorithm to display posts from followed users
- Engagement through likes and replies
- User suggestion system to discover relevant accounts
- Profile customization and updates

### Messaging System
Real-time messaging allows for direct communication:

- Socket.io implementation for instant message delivery
- Conversation tracking and history
- User online status indicators
- Message read receipts
- Conversation list management

### Crop Recommendation Engine
The ML-powered crop recommendation system:

- Takes environmental and soil parameters as input
- Uses Random Forest classifier to predict suitable crops
- Returns top 5 recommendations ranked by probability
- Stores recommendations in user history
- Provides crop-specific information

### Plant Disease Detection
The computer vision-based disease detection:

- Uses ResNet18 model fine-tuned on plant disease dataset
- Processes uploaded plant images
- Identifies diseases with high accuracy
- Provides detailed disease information
- Recommends treatment and prevention methods

### Weather Services
Weather forecasting integration:

- Current weather conditions
- 7-day forecast
- Agricultural relevance indicators
- Season-specific recommendations

## 🧠 ML Models

### Plant Disease Detection
- Based on a fine-tuned ResNet18 architecture
- Transfer learning from pre-trained weights
- Trained on a dataset of diverse plant leaf images
- Capable of identifying 38 different plant diseases
- Provides disease description and treatment recommendations from disease_info.csv

### Crop Recommendation System
- Uses Random Forest Classifier with high accuracy
- Takes inputs including:
  - N, P, K values (soil nutrient levels)
  - Temperature (in Celsius)
  - Humidity (percentage)
  - pH value of soil
  - Rainfall (in mm)
- Recommends top 5 suitable crops for given conditions
- Integrated with the main application to save recommendations by user ID

<div align="center">
  <img src="https://via.placeholder.com/700x350" alt="ML Models"/>
</div>

## 🔧 Installation

### Clone the repository
```bash
git clone https://github.com/abhishekbansal2312/threads.git
cd threads
```

### Set up the Node.js server
```bash
cd server
npm install
# Create .env file with:
# MONGODB_CONNECTION_STRING=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# PORT=4999
npm start
```

### Set up the Threads-Backend
```bash
cd ../Threads-Backend
npm install
# Create .env file with similar MongoDB and JWT settings
# PORT=5000
npm start
```

### Set up the ML service
```bash
cd ../ML
pip install -r requirements.txt
# Required packages: Flask, numpy, pandas, scikit-learn, flask-cors, requests
python app.py  # Runs on port 5002
```

### Set up the Disease Detection backend
```bash
cd ../backend
pip install -r requirements.txt
# Required packages: Flask, torch, torchvision, PIL, pandas, flask-cors
python app.py  # Runs on default Flask port 5000
```

### Set up the frontend
```bash
cd ../Threads-Frontend
npm install
# Create .env file with:
# VITE_API_BASE_URL=http://localhost:4999
# VITE_SOCKET_SERVER_URL=http://localhost:5000
npm run dev  # Starts development server
```

## 📱 Usage

### Account Setup
- Register an account with your details
- Login with your credentials
- Set up your profile with agricultural interests and location

### Social Features
- Follow other farmers and agriculture experts
- Create posts about farming practices, questions, or successes
- Engage with community by liking and replying to posts
- Send direct messages to other users for private discussions

### ML-Based Agricultural Tools
#### Crop Recommendation:
- Navigate to Crop Recommendation page
- Enter soil parameters (N, P, K values)
- Enter environmental data (temperature, humidity, pH, rainfall)
- Submit to receive top 5 recommended crops

#### Disease Detection:
- Navigate to Plant Disease page
- Upload a clear image of the affected plant leaf
- System will identify the disease
- Review detailed information about the disease and treatment options

#### Weather Services:
- Check current and forecasted weather for your region
- Plan agricultural activities based on weather conditions

<div align="center">
  <img src="https://via.placeholder.com/700x350" alt="Application Usage"/>
</div>

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/login`: Login existing user
- `POST /api/auth/logout`: Logout current user

### User Management Endpoints
- `GET /api/users/profile/:query`: Get user profile by username or query
- `GET /api/users/suggested`: Get suggested users to follow
- `POST /api/users/follow/:id`: Follow or unfollow a user
- `PUT /api/users/update/:id`: Update user profile information
- `PUT /api/users/freeze`: Freeze user account

### Post Endpoints
- `GET /api/posts/feed`: Get posts from followed users
- `GET /api/posts/:id`: Get specific post
- `GET /api/posts/user/:username`: Get posts by a specific user
- `POST /api/posts/create`: Create a new post
- `DELETE /api/posts/:id`: Delete a post
- `PUT /api/posts/like/:id`: Like or unlike a post
- `PUT /api/posts/reply/:id`: Reply to a post

### Messaging Endpoints
- `GET /api/messages/conversations`: Get all user conversations
- `GET /api/messages/:otherUserId`: Get messages with a specific user
- `POST /api/messages/`: Send a message to another user

### ML Endpoints
- `POST /predict`: Crop recommendation API (ML service)
  - Input: Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH, Rainfall, id
  - Output: Top 5 recommended crops
- `POST /predict`: Disease detection API (backend)
  - Input: Plant image
  - Output: Disease prediction, description, and possible solutions

## 🔮 Future Enhancements

### Planned Features
- **Crop Yield Prediction**: Implementation of models to predict harvest yields based on inputs and historical data
- **Marketplace Integration**: Enable farmers to sell their produce directly through the platform
- **Expert Consultation**: Connect farmers with agricultural experts for personalized advice
- **Image-Based Soil Analysis**: Upload soil images for nutrient deficiency detection
- **Offline Mode**: Basic functionality in areas with limited connectivity

### Visual Roadmap

[Click here to open the live tldraw](https://www.tldraw.com/f/BUuCEhKtyr_1E9f7FIEzn?d=v-1456.-835.4492.2986.klJ0h-sKVksgtxTOdnRGm)

## 👨‍💻 Contributors

| 👤 Name                   | 🎓 Roll Number     |                       
|--------------------------|-------------------|
| 🚀 **Abhishek Bansal**   | `2100820100010`   | 
| 🛠️ **Abdullah Sabir**    | `2100820100006`   | 
| 🎨 **Anjali Debnath**    | `2100820100032`   |            
| 📘 **Shashwat Tewari**   | `2100820100143`   |             
| 🧠 **Abhishek Srivastava** | `2100820100013` |           

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

