# CELLE RETREAT

Celle Retreat is a MERN (MongoDB, Express, React, Node.js) stack application where users can purchase tickets for various retreat experiences including Adventure, Wellness, Culinary, and Therapy.

## Introduction
Celle Retreat is designed to offer users a platform to browse and purchase tickets four various types of ticket retreats. The application is built using the MERN stack, with the frontend deployed using Vite and the backend connected to MongoDB via Mongoose.

## Features
- Browse and purchase tickets for different retreat types.
- User authentication (Sign up and Login).
- Cart functionality to manage ticket purchases.
- Secure payment processing.


## Installation
To get started with the project:

1. Clone the repository on Visual Studio Code:
 
   git clone https://github.com/aishamohamed/Retreat

Navigate to the /backend directory and start the server:

/backend
npm start

/frontend
npm run dev


## Backend-Setup

index.js: Main server file, accessible via npm start.
config/: Contains the database configuration file.
db.js: Configuration file for connecting to MongoDB via Mongoose.
models/: Directory containing model files.
ticketModel.js: Model definition for tickets.
userModel.js: Model definition for users.
paymentModel.js: Model definition for payments via stripe or paypal.
bookingModel.js: Model definition for bookings.

routes/: Directory containing route files.
ticketRoute.js: Routes for ticket retrieval from database to frontend via api.
userRoute.js: Routes for implementing user sign up details from frontend post to database.
paymentRoute.js: Routes for payment to enable users choose between stripe, paypal and secure checkout.
bookingRoute.js: Routes for booking-related operations.


## Frontend Setup
In the frontend directory, the main structure is as follows:

src/pages/: Directory containing individual page components.
Header.jsx, Home.jsx, Retreat.jsx, Shop.jsx, Register.jsx, Dashboard.jsx, Review.jsx, Login.jsx, Cart.jsx, Footer.jsx
src/styles/: Directory containing CSS styling for each page.
header.css, home.css, retreat.css, shop.css, sign up.css, dashboard.css, login.css, cart.css, footer.css
App.jsx: Main component of the application.
index.html: HTML file serving as the entry point for the application.


## Environment Variables

MONGODB_URI: Your MongoDB connection string.
Usage
Visit the homepage at https://retreat-c6yw.onrender.com to browse available retreat tickets.
Sign up or log in to purchase tickets.
Add tickets to your cart and proceed to checkout for payment processing.




## API Endpoints

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



## License

This project is licensed under the MIT License.
    
 





