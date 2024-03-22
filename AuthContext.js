import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        console.log('User signed in with email:', userEmail);
    }, [userEmail]);

    const signIn = (email) => {
        setUserEmail(email);
        setIsAuthenticated(true);
    };

    const signOut = () => {
        setUserEmail('');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, userEmail }}>
            {children}
        </AuthContext.Provider>
    );
};
