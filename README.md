# DropMe

DropMe is a ride-sharing application built with a React frontend and a Node.js backend. The application allows users to book rides and captains (drivers) to accept and complete rides. The project uses various technologies including Socket.IO for real-time communication, Google Maps API for location services, and MongoDB for data storage.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
<!-- 
## License

This project is licensed under the MIT License. -->
