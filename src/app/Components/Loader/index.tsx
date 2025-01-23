'use client';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { setUser } from '../../../../store/slices/userSlice';

// Define interfaces for the API response
interface UserResponse {
  user: {
    name?: string | null;
    referralCode?: string | null;
  };
  type?: string;
}

const Loader: React.FC = () => {
  const { loading } = useAppSelector((state) => state.loader);
  const dispatch = useAppDispatch();

  // Use useCallback to memoize the fetchUser function
  const fetchUser = useCallback(async (token: string): Promise<void> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const userData: UserResponse = await response.json();
      
      dispatch(setUser({
        name: userData.user.name || null,
        refid: userData.user.referralCode || null,
        loggedIn: userData.type === "S" ? true : false,
      }));
      
      console.log(userData); // This contains the user details if successful
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching user:', error.message);
      }
      throw error;
    }
  }, [dispatch]); 

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      fetchUser(token);
    }
  }, [fetchUser]); 

  return ( 
    loading && (
      <div 
        className="card"   
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          zIndex: 9999,
          pointerEvents: 'all'
        }}
      >
        <ProgressSpinner 
          style={{width: '50px', height: '50px'}} 
          strokeWidth="8" 
          fill="var(--surface-ground)" 
          animationDuration=".5s" 
        />
      </div>
    )
  );
};

export default Loader;