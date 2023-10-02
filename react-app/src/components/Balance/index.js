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

    if (!sessionUser) {
        history.push("/")
    }
    const path_location = location.pathname.split("/")

    useEffect(()=> {
        if(sessionUser){
            dispatch(expenseActions.loadAllUserExpenses())
            .then(()=>setIsLoaded(true))
        }
    },[dispatch, sessionUser]);

    let expences_balance;
    let friendObj;
    let friendGroupArr;
    if(path_location[1] === "friends"){
        const friendArr = friendsListArr?.filter(el=> el.id === Number(path_location[2]));
        if(friendArr) {
            friendObj = friendArr[0];
            friendGroupArr = friendArr[0]?.group_id
        }

        if(friendGroupArr) {
            expences_balance = allExpenses.filter(el => friendGroupArr.includes(el.group_id));
        }
    } else {
        expences_balance = allExpenses
    }

	return (
        <>
            {sessionUser && isLoaded &&(
                <div className="sidebar">
                    <div className='all-expenses-hide'>
                        {" "}All Expenses
                    </div>
                    <div className='side-bar-table'>Your Balance</div>
                    <div className="balance-list">
                        <div className="balance">
                            <ExpenseBalance balanceArr={expences_balance} sessionUser={sessionUser}/>
                        </div>
                    </div>
                </div>
            )}
        </>
	);
}

export default Balance;
