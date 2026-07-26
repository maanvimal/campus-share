import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import LoadingSpinner from './LoadingSpinner';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(Boolean(user));
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
