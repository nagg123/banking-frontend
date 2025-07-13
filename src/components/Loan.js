import React, { useState } from 'react';
import api from '../services/api';

const Loan = ({ onTransaction }) => {
    const [amount, setAmount] = useState('');

    const handleLoan = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/transactions/loan', { amount });
            alert(data.message);
            onTransaction();
            setAmount('');
        } catch (err) {
            alert(err.response?.data?.message || 'Loan request failed');
        }
    };

    return (
        <div className="card">
            <h3>Request Loan</h3>
            <form onSubmit={handleLoan} className="action-form">
                <input type="number" placeholder="Loan Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
                <button type="submit" className="btn-loan">Request</button>
            </form>
        </div>
    );
};

export default Loan;