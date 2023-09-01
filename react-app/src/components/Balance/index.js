import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as friendActions from "../../store/friends";
import * as expenseActions from "../../store/expenses";

function Balance(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const allExpenses = useSelector(state => Object.values(state.expenses));

    if (!sessionUser) {
        history.push("/")
    }
    useEffect(()=> {
        if(sessionUser){
            dispatch(expenseActions.loadAllUserExpenses())
            .then(()=>setIsLoaded(true))
        }
    },[dispatch, sessionUser]);

    let balance = 0;
    let user_owes = 0;
    let friend_owes = 0;
    for(let i = 0; i < allExpenses.length; i++){
        let exp = allExpenses[i];
        const amount_split = Number(exp?.price/2);

        if(exp.paid_by === sessionUser.id){
            user_owes += amount_split
        }
        if(exp.paid_by !== sessionUser.id){
            friend_owes += amount_split
        }
    }
    balance = Math.abs((user_owes) - (friend_owes))

	return (
        <>
            {sessionUser && (
                <div className="sidebar">
                    <div className='side-bar-table'>Your Balance</div>
                    <div className="balance-list">
                        <div className="balance">
                        {user_owes > friend_owes ? (
                            <>
                                <div className="you-owe">You are owed</div>
                                <div className="you-owe">${balance}</div>
                            </>
                        ):(
                            <>
                                <div className="friend-owes">You owe </div>
                                <div className="friend-owes">${balance}</div>
                            </>
                        )}
                        </div>
                    </div>
                </div>
            )}
        </>
	);
}

export default Balance;
