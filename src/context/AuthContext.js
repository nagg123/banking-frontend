import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkLoggedIn = useCallback(async () => {
        try {
            const { data } = await api.get('/auth/user');
            setUser(data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkLoggedIn();
    }, [checkLoggedIn]);

    const login = async (username, password) => {
        const { data } = await api.post('/auth/login', { username, password });
        await checkLoggedIn(); // Fetch full user data after login
    };

    const register = async (fullName, username, email, password) => {
        await api.post('/auth/register', { fullName, username, email, password });
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };
    
    const updateUserBalance = (newBalance) => {
      setUser(prevUser => ({...prevUser, balance: newBalance}));
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, updateUserBalance, refreshUser: checkLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);