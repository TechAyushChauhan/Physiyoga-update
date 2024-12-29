import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // No fallback here

export function decodeToken(token: string) {
    try {
        console.log('Token:', token);
        console.log('JWT_SECRET:', JWT_SECRET); // Ensure it is loaded correctly
        const decoded = jwt.verify(token, JWT_SECRET!); // Add `!` to assert non-null
        console.log("Decoded Token:", decoded);
        return decoded;
    } catch (err) {
        console.error("Token verification failed:", err.message);
    }
}
