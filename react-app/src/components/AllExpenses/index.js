import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseTile from '../ExpenseTile';
import * as expenseActions from "../../store/expenses";
import CreateExpenseModal from '../CreateExpenseModal';

function AllExpenses(){
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const allExpenses = useSelector(state => Object.values(state.expenses));
    const sortedExpenses = allExpenses.sort((a,b) => new Date(b.expense_date) - new Date(a.expense_date))

    useEffect(()=> {
        dispatch(expenseActions.loadAllUserExpenses())
        .then(()=>setIsLoaded(true))
    },[dispatch]);

	return (
        <>
            {isLoaded && (
                <div>
                        <div>
                            <h2>All Expenses</h2>
                            <div>
                                <CreateExpenseModal/>
                            </div>
                            {sortedExpenses.map(el => (<ExpenseTile key={el.id} expense={el} clickable={true}/>))}
                        </div>
                </div>
            )}
        </>
	);
}

export default AllExpenses;
