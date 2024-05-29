import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Remaining = () => {
    const { expenses, budget, currency } = useContext(AppContext);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((total, item) => {
        return (total = total + item.cost);
    }, 0);

    // Calculate remaining budget
    const remainingBudget = budget - totalExpenses;

    // Determine alert type based on remaining budget
    const alertType = remainingBudget < 0 ? 'alert-danger' : 'alert-success';

    return (
        <div className={`alert ${alertType}`}>
            <span>Remaining: {currency}{remainingBudget}</span>
        </div>
    );
};

export default Remaining;
