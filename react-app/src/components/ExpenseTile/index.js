import { Link } from "react-router-dom";
import React from 'react';

const ExpenseTile = ({expense, clickable, sessionUser}) => {
    const amount_split = Number(expense?.price/2).toFixed(2);
    const amount_paid = Number(expense?.price).toFixed(2);
    const dateFormat = (expense?.expense_date)
    const date_values = dateFormat ? dateFormat?.split("-") : "";
    const year = dateFormat ? date_values[0] : "";
    const month = dateFormat ? date_values[1] : "";
    const day = dateFormat ? date_values[2] : "";
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleString('default', { month: 'short' });

    let paid_by;
    let user_owes;

    for(let i = 0; i < expense?.expense_group_users?.length; i++){
        let group_user = expense.expense_group_users[i]
        if(group_user.id === expense.paid_by){
            paid_by = group_user.username;
        }
        if(group_user.id !== expense.paid_by){
            user_owes = group_user.username;
        }
    }

    return (
        <>
            <div className="tile-bar-container">
                <div className="main-block">
                    <div className="date">
                        <div className="month">{monthName}</div>
                        <div className="day">{day}</div>
                    </div>
                    <div>{expense?.receipt_img_url ?
                            <img src={expense?.receipt_img_url} alt="receipt_img"/>
                            : <div></div>}
                    </div>
                    {clickable ? (
                        <div className="description"><Link to={`/expenses/${expense.id}`}> {expense?.description}</Link></div>
                        ) : <div className="description">{expense?.description}</div>
                    }
                </div>
                <div className="paid-block">
                    <div className="paid-by">
                        <div className="paid-by-text">{paid_by} paid </div>
                        <div className="money">${amount_paid}</div>
                    </div>
                    <div className="paid-by">

                        {sessionUser?.username === user_owes ? (
                            <>
                                <div className="paid-by-text">{paid_by} lent you</div>
                                <div className="friend-owes">${amount_split}</div>
                            </>
                        ) : (
                            <>
                                <div className="paid-by-text">You lent {user_owes}</div>
                                <div className="you-owe">${amount_split}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};

export default ExpenseTile;
