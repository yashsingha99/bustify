import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getUserById } from '../API/user.api';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await getUserById(id); // Adjust the endpoint as necessary
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Detail</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Name: {user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.phoneNumber}</p>
        {/* Add other user details as needed */}
      </div>
    </div>
  );
};

export default UserDetail;
