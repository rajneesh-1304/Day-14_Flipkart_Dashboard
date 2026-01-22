'use client'
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector(state => state.users.currUser)
  console.log(isAuthenticated)

  return isAuthenticated ? <>{children}</> : <Link href='/' replace/>;
};

export default ProtectedRoute;
