// remote/src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import useAuthStore from 'host/authStore';

export const useAuth = () => {
  const [auth, setAuth] = useState({
    authState: null,
    oktaAuth: null,
  });

  useEffect(() => {
    try {
      // Get initial state
      const store = useAuthStore.getState();
      setAuth({
        authState: store.authState,
        oktaAuth: store.oktaAuth,
      });

      // Subscribe to changes
      const unsubscribe = useAuthStore.subscribe((state) => {
        setAuth({
          authState: state.authState,
          oktaAuth: state.oktaAuth,
        });
      });

      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error('Error accessing auth store:', error);
    }
  }, []);

  return auth;
};
