import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as expenseActions from "../../store/expenses";
import ExpenseBalance from '../ExpenseBalance';

function Balance(){
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const allExpenses = useSelector(state => Object.values(state.expenses));
    const friendsListArr = useSelector(state => state.friends.friends);
    const groupListArr = useSelector(state => Object.values(state.groups));
    const balance_from_state = useSelector(state => (state.balances.balance));
    const path_location = location.pathname.split("/")
    let balance = 0;
    if (!sessionUser) {
        history.push("/")
    } else {
        if(path_location[1] === "friends"){
            const friendArr = friendsListArr?.filter(el=> el.id === Number(path_location[2]));
            if(friendArr?.length > 0) {
                balance = friendArr[0]?.balance
            } else {
                balance = 0
            }

        } else if(path_location[1] === "groups"){
            const friendArr = groupListArr?.filter(el=> el.id === Number(path_location[2]));
            if(friendArr?.length > 0) {
                balance = friendArr[0]?.balance
            } else {
                balance = 0
            }
        } else {
            balance = balance_from_state
        }
    }

    useEffect(()=> {
        if(sessionUser){
            dispatch(expenseActions.loadAllUserExpenses())
            .then(()=>setIsLoaded(true))
        }
    },[dispatch, sessionUser]);

	return (
        <>
            {sessionUser && isLoaded && (
                <div className="sidebar">
                    <div className='all-expenses-hide'>
                        {" "}All Expenses
                    </div>
                    <div className='side-bar-table'>Your Balance</div>
                    <div className="balance-list">
                        <div className="balance">
                            <ExpenseBalance balance={balance}/>
                        </div>
                    </div>
                </div>
            )}
            {!sessionUser && (
                <div></div>
            )}
        </>
	);
}

export default Balance;
