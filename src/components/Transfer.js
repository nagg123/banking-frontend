import React, { useState } from 'react';
import api from '../services/api';

const Transfer = ({ onTransaction }) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/transactions/transfer', { recipientUsername: recipient, amount });
            alert(data.message);
            onTransaction();
            setRecipient('');
            setAmount('');
        } catch (err) {
            alert(err.response?.data?.message || 'Transfer failed');
        }
    };

    return (
        <div className="card">
            <h3>Transfer Money</h3>
            <form onSubmit={handleTransfer} className="action-form">
                <input type="text" placeholder="Recipient username" value={recipient} onChange={e => setRecipient(e.target.value)} required />
                <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
                <button type="submit" className="btn-transfer">Transfer</button>
            </form>
        </div>
    );
};

export default Transfer;