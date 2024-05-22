/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/userDashboard.css';
const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const userResponse = await axios.get('https://localhost:3500/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUserData(userResponse.data);
      } catch(error) {
        console.error('Error fetching dashboard data:', error);

        // log out if token expired
        localStorage.removeItem(token);
        window.location.href = '/login';
      }

      try {
        // Fetch bookings 
        const bookingResponse = await axios.get('https://localhost:3500/booking', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        let bookings = await bookingResponse.data;
        
        fetch('https://localhost:3500')
            .then(response => response.json())
            .then(data => {
              // filter tickets on only the booked tickets
              bookings = bookings.map(booking => {
                const ticket = data.find(ticket => ticket._id === booking.ticketId);
                return {
                  date: booking.date,
                  location: ticket.location,
                  description: ticket.description
                }
              })
              
              // update upcoming bookings state variable
              setUpcomingBookings(bookings);
            })
            .catch(error => console.error('Error fetching tickets:', error));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className='d-container'>
        <div className='dashboard-container'>
            <h2>Dashboard</h2>
            <p>Welcome, {userData.username}!</p>

            <div className='user-information'>
                <h3>Your Profile</h3>
                <p>Email: {userData.email}</p>
                <p>Username: {userData.username}</p>
                {/* Add more user profile information here */}
            </div>

            <div className='upcoming-bookings'>
                <h3>Upcoming Bookings</h3>
                {upcomingBookings.length > 0 ? (
                    <ul>
                    {upcomingBookings.map((booking, index) => (
                        <li key={index}>
                        <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                        <p>Location: {booking.location}</p>
                        <p>Description: {booking.description} </p>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className='no-bookings'>No upcoming bookings.</p>
                )}
            </div>
        </div>
    </div>
  );
}
export default Dashboard;
