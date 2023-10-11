import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ExpenseTile from '../ExpenseTile';
import * as expenseActions from "../../store/expenses";
import ManageExpenses from '../ManageExpenses';
import Comments from '../Comments';

function Expense(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const expenseObj = useSelector(state => state.expenses);
    const sessionUser = useSelector(state => state.session.user);
    const expense = expenseObj[id];

    if (!sessionUser) {
        history.push("/")
    }

    useEffect(()=> {
        if(sessionUser){
            dispatch(expenseActions.loadExpenseById(id))
            .then(()=>setIsLoaded(true))
        }
    },[dispatch, id, sessionUser]);
	return (
        <>
            {/* {sessionUser && isLoaded && ( */}
            {sessionUser && (
                <div className="middle">
                    { expense ?
                        (<div>
                            <div className='expense-bar-container'>
                                <h2>Expense</h2>
                            </div>
                            <ExpenseTile clickable={false} expense={expense} sessionUser={sessionUser}/>
                            <ManageExpenses expense={expense}/>
                            <Comments expense={expense}/>
                        </div>
                        ) : (
                            <h1>Expense Not Found</h1>
                        )
                    }
                </div>
            )}
        </>
	);
}

export default Expense;
