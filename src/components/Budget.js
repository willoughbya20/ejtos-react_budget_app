import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const totalSpending = expenses.reduce((total, item) => total + item.cost, 0);

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value);
        
        if (value < totalSpending) {
            alert("Budget cannot be lower than the spending amount of " + currency + totalSpending);
            return;
        }

        if (value > 20000) {
            alert("Budget cannot exceed 20,000");
            return;
        }

        setNewBudget(value);
        dispatch({ type: 'SET_BUDGET', payload: value });
    };

    const handleCurrencyChange = (event) => {
        const selectedCurrency = event.target.value;
        dispatch({ type: 'CHG_CURRENCY', payload: selectedCurrency });
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}{budget}</span>
            <input 
                type="number" 
                step="10" 
                value={newBudget} 
                onChange={handleBudgetChange}
            />
            <select value={currency} onChange={handleCurrencyChange}>
                <option value="£">£ (GBP)</option>
                <option value="$">$ (USD)</option>
                <option value="€">€ (EUR)</option>
                {/* Add more currencies as needed */}
            </select>
        </div>
    );
};

export default Budget;
