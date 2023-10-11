import React from 'react';

function ExpenseBalance({balance}){
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
