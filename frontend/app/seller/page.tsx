'use client';

import React from 'react';
import { useAppSelector } from '../redux/hooks';
import Navbar from '../dashboard/Navbar/Navbar';

const Page = () => {
  const currentUser = useAppSelector(
      (state) => state.users.currentUser
    );

  return (
    <div>
      <Navbar/>
      <div style={{ padding: '2rem', fontSize: '1.5rem' }}>
      
        Welcome, <strong>{currentUser?.name}</strong> (Seller) 👋
    </div>
    </div>
  );
};


export default Page;
