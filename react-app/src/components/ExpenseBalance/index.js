import React from 'react';
import BalanceFunction from "../BalanceFunc";

function ExpenseBalance({balanceArr, sessionUser}){

    let balance = BalanceFunction(balanceArr, sessionUser);
    let abs_balance = Math.abs(balance)
    let num_balance = Number(abs_balance).toFixed(2);

	return (
        <>
            {balance > 0 ? (
                <>
                    <div className="you-owe">You are owed</div>
                    <div className="you-owe">${num_balance}</div>
                </>
            ):(
                <>
                    <div className="friend-owes">You owe </div>
                    <div className="friend-owes">${num_balance}</div>
                </>
            )}
        </>
	);
}

export default ExpenseBalance;
