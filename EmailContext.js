import React, { createContext, useState } from 'react';

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
    const [email, setEmail] = useState('');

    const updateEmail = (newEmail) => {
        setEmail(newEmail);
    };

    const value = { email, updateEmail };

    return <EmailContext.Provider value={value}>{children}</EmailContext.Provider>;
};