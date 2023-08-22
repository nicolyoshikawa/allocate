import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseTile from '../ExpenseTile';
import * as expenseActions from "../../store/expenses";

function Expense(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const expenseObj = useSelector(state => state.expenses);
    const expense = expenseObj[id];

    useEffect(()=> {
        dispatch(expenseActions.loadExpenseById(id))
        .then(()=>setIsLoaded(true))
    },[dispatch, id]);
	return (
        <>
            {isLoaded && (
                <div>
                        <div>
                            <h2>Expense</h2>
                            <ExpenseTile clickable={false} expense={expense}/>

                        </div>
                </div>
            )}
        </>
	);
}

export default Expense;
