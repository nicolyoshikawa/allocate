import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseTile from '../ExpenseTile';
import * as expenseActions from "../../store/expenses";
import CreateExpenseModal from '../CreateExpenseModal';

function AllExpenses(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const allExpenses = useSelector(state => Object.values(state.expenses));
    const sortedExpenses = allExpenses.sort((a,b) => new Date(b.expense_date) - new Date(a.expense_date))

    if (!sessionUser) {
        history.push("/")
    }

    useEffect(()=> {
        if(sessionUser){
            dispatch(expenseActions.loadAllUserExpenses())
            .then(()=>setIsLoaded(true))
        }
    },[dispatch, sessionUser]);

	return (
        <>
            {isLoaded && sessionUser && (
                <div>
                        <div>
                            <div className='expense-bar-container'>
                                <h2 className='expense-bar'>All Expenses</h2>
                                <div className='expense-bar'><CreateExpenseModal/></div>
                            </div>
                            {sortedExpenses.map(el => (<ExpenseTile key={el.id} expense={el} clickable={true} sessionUser={sessionUser}/>))}
                        </div>
                </div>
            )}
        </>
	);
}

export default AllExpenses;
