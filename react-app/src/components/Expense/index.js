import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseTile from '../ExpenseTile';
import * as expenseActions from "../../store/expenses";
import * as balanceActions from "../../store/balance";
import ManageExpenses from '../ManageExpenses';
import Comments from '../Comments';
import Balance from '../Balance';

function Expense(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const expenseObj = useSelector(state => state.expenses);
    const balance_state = useSelector(state => state.balances);
    const sessionUser = useSelector(state => state.session.user);
    const expense = expenseObj[id];

    if (!sessionUser) {
        history.push("/")
    }

    useEffect(()=> {
        if(sessionUser){
            dispatch(expenseActions.loadExpenseById(id))
            .then(()=>setIsLoaded(true))
            if(Object.keys(balance_state).length === 0){
                dispatch(balanceActions.loadAllUserExpenseBalance());
            }
        }
    },[dispatch, id, sessionUser]);
	return (
        <>
            {/* {sessionUser && isLoaded && ( */}
            {sessionUser && (
                <>
                    { expense ?
                        (
                            <>
                                <div className="middle">
                                    <div className='expense-bar-container'>
                                        <h2>Expense</h2>
                                    </div>
                                    <ExpenseTile clickable={false} expense={expense} sessionUser={sessionUser}/>
                                    <ManageExpenses expense={expense}/>
                                    <Comments expense={expense}/>
                                </div>
                                <Balance/>
                            </>
                        ) : (
                            <>
                                <div className="middle">
                                    <div className='expense-bar-container'>
                                        <h1>Expense Not Found</h1>
                                    </div>
                                </div>
                                <Balance/>
                            </>
                        )
                    }
                </>
            )}
        </>
	);
}

export default Expense;
