# DropMe

DropMe is a ride-sharing application built with a React frontend and a Node.js backend. The application allows users to book rides and captains (drivers) to accept and complete rides. The project uses various technologies including Socket.IO for real-time communication, Google Maps API for location services, and MongoDB for data storage.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Google Cloud Setup](#google-cloud-setup)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

### Backend Setup

1. Clone the repository:

```sh
git clone https://github.com/yourusername/dropme.git
cd dropme/server
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the `server` directory and add the following environment variables:

```
PORT=4000
MONGO_CLOUD_URI=your_mongo_cloud_uri
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the backend server:

```sh
npm start
```

### Frontend Setup

1. Navigate to the `client` directory:

```sh
cd ../client
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the `client` directory and add the following environment variables:

```
VITE_BASE_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the frontend development server:

```sh
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. You can register as a user or a captain (driver).
3. Users can book rides, and captains can accept and complete rides.

## Project Structure

```
.
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── server
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── README.md
```

## API Documentation

### User Endpoints

- **POST** `/users/register`: Register a new user.
- **POST** `/users/login`: Login a user.
- **GET** `/users/profile`: Get the profile of the logged-in user.
- **GET** `/users/logout`: Logout the user.

### Captain Endpoints

- **POST** `/captains/register`: Register a new captain.
- **POST** `/captains/login`: Login a captain.
- **GET** `/captains/profile`: Get the profile of the logged-in captain.
- **GET** `/captains/logout`: Logout the captain.

### Ride Endpoints

- **POST** `/rides/create`: Create a new ride.
- **GET** `/rides/get-fare`: Get the fare for a ride.
- **POST** `/rides/confirm`: Confirm a ride.
- **GET** `/rides/start-ride`: Start a ride.
- **POST** `/rides/end-ride`: End a ride.

### Map Endpoints

- **GET** `/maps/get-coordinates`: Get coordinates for an address.
- **GET** `/maps/get-distance-time`: Get distance and time between two locations.
- **GET** `/maps/get-suggestions`: Get location suggestions based on input.

## Environment Variables

### Backend

- `PORT`: The port on which the backend server runs.
- `MONGO_CLOUD_URI`: The MongoDB connection URI.
- `JWT_SECRET`: The secret key for JWT token generation.
- `GOOGLE_MAPS_API_KEY`: The API key for Google Maps services.

### Frontend

- `VITE_BASE_URL`: The base URL for the backend server.
- `VITE_GOOGLE_MAPS_API_KEY`: The API key for Google Maps services.

## Google Cloud Setup

### Step-by-Step Guide to Create a Google Cloud Account and Activate the Google Maps API

1. **Create a Google Cloud Account:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/).
   - Click on "Get started for free" and follow the instructions to create your account.

2. **Create a New Project:**
   - Once logged in, click on the project dropdown at the top of the page.
   - Click on "New Project" and fill in the required details.
   - Click "Create" to create your new project.

3. **Enable Billing:**
   - Go to the "Billing" section in the left-hand menu.
   - Set up a billing account if you haven't already (this is required to use Google Cloud services).
   - Link your new project to the billing account.
   - **Note:** If the project is used within the free tier limits, you will not be charged any money.

4. **Enable the Google Maps API:**
   - Go to the "API & Services" section in the left-hand menu.
   - Click on "Library" and search for "Maps JavaScript API".
   - Click on the "Maps JavaScript API" and then click "Enable".
   - Repeat the process to enable other required APIs such as "Geocoding API" and "Directions API".

5. **Generate API Key:**
   - Go to the "Credentials" section under "API & Services".
   - Click on "Create Credentials" and select "API Key".
   - Copy the generated API key and add it to your `.env` files as shown in the installation steps.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
<!-- 
## License

This project is licensed under the MIT License. -->
