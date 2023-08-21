import React from 'react';
import { Navigate } from 'react-router-dom';

// Custom Route Wrapper Component for Redirecting Unauthenticated Users
export function AuthenticatedRoute({ element }) {
    const isAuthenticated =sessionStorage.getItem('token');

  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
}

// Custom Route Wrapper Component for Preventing Access to Logged-In Users
export function UnauthenticatedRoute({ element }) {
    const isAuthenticated =sessionStorage.getItem('token');

  if (!isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/admin/billing/" />;
  }
}
