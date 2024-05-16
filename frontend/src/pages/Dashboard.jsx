import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const userResponse = await axios.get('http://localhost:3500/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUserData(userResponse.data);

        // Fetch bookings 
        const upcomingResponse = await axios.get('http://localhost:3500/bookings/upcoming', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUpcomingBookings(upcomingResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {userData.username}!</p>

      <div>
        <h3>Your Profile</h3>
        <p>Email: {userData.email}</p>
        {/* Add more user profile information here */}
      </div>

      <div>
        <h3>Upcoming Bookings</h3>
        {upcomingBookings.length > 0 ? (
          <ul>
            {upcomingBookings.map((booking, index) => (
              <li key={index}>
                <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                <p>Location: {booking.location}</p>
                <p>Description: {booking.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming bookings.</p>
        )}
      </div>
    </div>
  );
}
export default Dashboard;
