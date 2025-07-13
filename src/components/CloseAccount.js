import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const CloseAccount = () => {
    const { user, logout } = useAuth();
    const [password, setPassword] = useState('');

    const handleClose = async (e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure? This action cannot be undone.")) return;
        try {
            await api.post('/user/close-account', { username: user.username, password });
            alert('Account closed successfully.');
            logout();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to close account');
        }
    };

    return (
        <div className="card">
            <h3>Close Account</h3>
            <form onSubmit={handleClose} className="action-form">
                <input type="password" placeholder="Confirm Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit" className="btn-close">Close Account</button>
            </form>
        </div>
    );
};

export default CloseAccount;