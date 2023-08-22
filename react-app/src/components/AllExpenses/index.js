import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseTile from '../ExpenseTile';
import * as expenseActions from "../../store/expenses";

function AllExpenses(){
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const allExpenses = useSelector(state => Object.values(state.expenses));
	const sessionUser = useSelector(state => state.session.user);

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
                            {allExpenses.map(el => (<ExpenseTile key={el.id} expense={el} clickable={true} sessionUser={sessionUser}/>))}
                        </div>
                </div>
            )}
        </>
	);
}

export default AllExpenses;
