import { Link } from "react-router-dom";
import React from 'react';

const ExpenseTile = ({expense, clickable}) => {
    const amount_split = Number(expense?.price/2).toFixed(2);
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
                <div>{monthName}-{year}</div>
                <div>{day}</div>
                <div>{expense?.receipt_img_url ?
                        <img src={expense?.receipt_img_url} alt="receipt_img"/>
                        : <div></div>}
                </div>
                {clickable ? (
                    <div><Link to={`/expenses/${expense.id}`}> {expense?.description}</Link></div>
                    ) : <div>{expense?.description}</div>
                }
                <div>{paid_by} paid ${expense?.price}</div>
                <div>{user_owes} owes ${amount_split}</div>
            </div>
        </>
    )
};

export default ExpenseTile;
