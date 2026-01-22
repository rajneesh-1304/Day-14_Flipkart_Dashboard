'use client';

import React from 'react';
import { useAppSelector } from '../redux/hooks';

const Page = () => {
  const currentUser = useAppSelector(
      (state) => state.users.currentUser
    );

  return (
    <div style={{ padding: '2rem', fontSize: '1.5rem' }}>
        Welcome, <strong>{currentUser?.name}</strong> (Admin) 👋
    </div>
  );
};

export default Page;
