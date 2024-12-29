'use client';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { setUser } from '../../../../store/slices/userSlice';


const Loader: React.FC = () => {
  const {loading} = useAppSelector((state)=>state.loader)
   const dispatch = useAppDispatch()
  async function fetchUser(token: string): Promise<any> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
     console.log((data.user.referralCode))
           dispatch(setUser({
            name: data.user.name || null,
            refid:data.user.referralCode || null,
            loggedIn:(data && data.type=="S")?true:false,
           }))
      console.log( data); // This contains the user details if successful
    } catch (error: any) {
      console.error('Error fetching user:', error.message);
      throw error;
    }
  }
  useEffect(()=>{
    const token =localStorage.getItem('authToken')
    console.log(token)
    if (token) {
      fetchUser(token)
      
    }
  
  },[])
  return ( 
  
   ( loading && <div className="card"   style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    zIndex: 9999, // Ensures it is above other elements
    pointerEvents: 'all' // Blocks interaction with underlying elements
  }}
  >
            <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>)
    );
};

export default Loader;