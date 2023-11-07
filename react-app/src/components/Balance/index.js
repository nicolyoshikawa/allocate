import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as expenseActions from "../../store/expenses";
import ExpenseBalance from '../ExpenseBalance';

function Balance(){
    // console.log("starting balance");
    // console.log(new Date())
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    // const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const friendsListArr = useSelector(state => state.friends.friends);
    const friendsExpListArr = useSelector(state => state.friends.expenses);
    const groupListArr = useSelector(state => Object.values(state.groups));
    const balance_from_state = useSelector(state => (state.balances.balance));
    const path_location = location.pathname.split("/")
    // console.log("grabbed from states");
    // console.log(new Date())
    let balance = 0;
    if (!sessionUser) {
        history.push("/")
    } else {
        if(path_location[1] === "friends"){
            // console.log("inside friends")
            const friendArr = friendsListArr?.filter(el=> el.id === Number(path_location[2]));
            // console.log("friendArr is", friendArr)
            // console.log("friendsExpListArr",friendsExpListArr)
            if(friendArr && friendArr[0].balance !== 0) {
                balance = friendsExpListArr.balance

                // console.log("inside the if", balance)
            } else {
                balance = 0
                // console.log("inside the else", balance)
            }

        } else if(path_location[1] === "groups"){
            const friendArr = groupListArr?.filter(el=> el.id === Number(path_location[2]));
            if(friendArr && friendArr[0].balance) {
                balance = friendArr[0].balance
            } else {
                balance = 0
            }
        }  else if(path_location[1] === "home"){
            balance = balance_from_state
        }   else if(path_location[1] === "expenses"){
            balance = balance_from_state
        } else {
            balance = 0
        }
    }

    // console.log("calculated balance")
    // console.log(new Date())

    // useEffect(()=> {
    //     if(sessionUser){
    //         dispatch(expenseActions.loadAllUserExpenses())
    //         .then(()=>setIsLoaded(true))
    //     }
    // },[dispatch, sessionUser]);

	return (
        <>
            {/* {sessionUser && isLoaded && ( */}
            {sessionUser && (
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
                <div className="sidebar">
                <div className='all-expenses-hide'>
                    {" "}All Expenses
                </div>
                </div>
            )}
        </>
	);
}

export default Balance;
