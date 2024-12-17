'use client';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useAppSelector } from '../../../../lib/hooks';


const Loader: React.FC = () => {
  const {loading} = useAppSelector((state)=>state.loader)
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