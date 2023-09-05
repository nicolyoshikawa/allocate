import React from 'react';
import BalanceFunction from "../BalanceFunc";

function ExpenseBalance({balanceArr, sessionUser}){

    let balance = BalanceFunction(balanceArr, sessionUser);
    let num_balance = Number(balance)

	return (
        <>
            {balance > 0 ? (
                <>
                    <div className="you-owe">You are owed</div>
                    <div className="you-owe">${Math.abs(num_balance)}</div>
                </>
            ):(
                <>
                    <div className="friend-owes">You owe </div>
                    <div className="friend-owes">${Math.abs(num_balance)}</div>
                </>
            )}
        </>
	);
}

export default ExpenseBalance;
