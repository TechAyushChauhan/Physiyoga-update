import jwt from 'jsonwebtoken';

// Make sure to add your secret key in .env file
const JWT_SECRET = process.env.JWT_SECRET || 'xxasd7885['; 
export function decordtoken(token:string){
    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verifies and decodes
        console.log("Decoded Token:", decoded);
    } catch (err) {
        console.error("Token verification failed:", err.message);
    }

}