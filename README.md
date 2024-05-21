 CELLE RETREAT

Celle Retreat is a MERN (MongoDB, Express, React,  Node.js) stack application where users can purchase tickets four various retreat experiences including Adventure, Wellness, Culinary, and Therapy.

## Introduction

Celle Retreat is designed to offer users a platform to browse and purchase tickets for various types of retreats. The application is built using the MERN stack, with the frontend deployed using Vite and the backend connected to MongoDB via Mongoose.

## Features

- Browse and purchase tickets for different retreat types.
- User authentication (Sign up and Login).
- Cart functionality to manage ticket purchases.
- Secure payment processing.
- Responsive design.

## Installation

To get started with the project:

### Clone the repository on Visual Studio Code

```bash
###https://github.com/aishamohamed/Retreat

### /backend
   npm start
### /frontend
  npm run dev

### Backend Setup
In the backend directory, you'll find the following structure:
backend/
├── index.js
├── config/
│ └── db.js
├── models/
│ ├── ticketModel.js
│ ├── userModel.js
│ ├── paymentModel.js
│ └── bookingModel.js
└── routes/
├── ticketRoute.js
├── userRoute.js
├── paymentRoute.js
└── bookingRoute.js

- **`index.js`:** Main server file, accessible via npm start.
- **`config/`:** Contains the database configuration file.
  - **`db.js`:** Configuration file for connecting to MongoDB via Mongoose.
- **`models/`:** Directory containing model files.
  - **`ticketModel.js`:** Model definition for tickets.
  - **`userModel.js`:** Model definition for users.
  - **`paymentModel.js`:** Model definition for payments.
  - **`bookingModel.js`:** Model definition for bookings.
- **`routes/`:** Directory containing route files.
  - **`ticketRoute.js`:** Routes for ticket-related operations.
  - **`userRoute.js`:** Routes for user-related operations.
  - **`paymentRoute.js`:** Routes for payment-related operations.
  - **`bookingRoute.js`:** Routes for booking-related operations.

Frontend Setup
In the frontend directory the following is the main structure:
frontend/
  ├── src/
  │   ├── pages/
  │   │   ├── Header.jsx
  │   │   ├── Home.jsx
  │   │   ├── Retreat.jsx
  │   │   ├── Shop.jsx
  │   │   ├── Register.jsx
  │   │   ├── Dashboard.jsx
  │   │   ├── Review.jsx
  │   │   ├── Login.jsx
  │   │   ├── Cart.jsx
  │   │   └── Footer.jsx
  │   ├── styles/
  │   │   ├── header.css
  │   │   ├── home.css
  │   │   ├── retreat.css
  │   │   ├── shop.css
  │   │   ├── sign up.css
  │   │   ├── dashboard.css
  │   │   ├── login.css
  │   │   ├── cart.css
  │   │   └── footer.css
  ├── App.jsx
  └── index.html
### For frontend pages are subdivided into files for easy access and group contribution then imported into App.js.
### React and vite are used.

### Both directories have their own dependendancies in package.json, package-lock.json.
### env file located in backend directory


Environment Variables
The project requires the following environment variables:

MONGODB_URI: Your MongoDB connection string.
Usage
Visit the homepage at https://retreat-c6yw.onrender.com to browse available retreat tickets.
Sign up or log in to purchase tickets.
Add tickets to your cart and proceed to checkout for payment processing.

API Endpoints
User Routes
POST /api/user/signup: Sign up a new user.
POST /api/user/login: Log in an existing user.

Ticket Routes
GET /api/ticket: Retrieve all tickets.
GET /api/ticket/:id: Retrieve a single ticket by ID.

Booking Routes
POST /api/booking: Create a new booking.
GET /api/booking/:id: Retrieve a booking by ID.

Payment Routes
POST /api/payment: Process a payment.



License
This project is licensed under the MIT License.





