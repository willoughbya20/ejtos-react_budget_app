// context/AppContext.js
import React, { createContext, useReducer } from 'react';

// The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            const totalSpending = state.expenses.reduce((total, item) => total + item.cost, 0);
            const newTotal = totalSpending + action.payload.cost;

            if (newTotal <= state.budget) {
                const updatedExpenses = state.expenses.map((currentExp) => {
                    if (currentExp.name === action.payload.name) {
                        return { ...currentExp, cost: currentExp.cost + action.payload.cost };
                    }
                    return currentExp;
                });

                return {
                    ...state,
                    expenses: updatedExpenses,
                };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return state;
            }

        case 'RED_EXPENSE':
            const reducedExpenses = state.expenses.map((currentExp) => {
                if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                    return { ...currentExp, cost: currentExp.cost - action.payload.cost };
                }
                return currentExp;
            });

            return {
                ...state,
                expenses: reducedExpenses,
            };

        case 'DELETE_EXPENSE':
            const deletedExpenses = state.expenses.map((currentExp) => {
                if (currentExp.name === action.payload) {
                    return { ...currentExp, cost: 0 };
                }
                return currentExp;
            });

            return {
                ...state,
                expenses: deletedExpenses,
            };

        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload,
            };

            case 'CHG_CURRENCY':
                const updatedExpenses = state.expenses.map(expense => ({
                    ...expense,
                    currency: action.payload
                }));
                return {
                    ...state,
                    currency: action.payload,
                    expenses: updatedExpenses
                };

            
        default:
            return state;
    }
};

// Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// Creates the context - this is the thing our components import and use to get the state
export const AppContext = createContext();

// Provider component - wraps the components we want to give access to the state
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
