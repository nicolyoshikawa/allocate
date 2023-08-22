import { Link } from "react-router-dom";

const ExpenseTile = ({expense, clickable, sessionUser}) => {
    const amount_split = Number(expense.price/2).toFixed(2);
    let paid_by;
    let user_owes;
    for(let i = 0; i < expense.expense_group_users.length; i++){
        let group_user = expense.expense_group_users[i]
        if(group_user.id === expense.paid_by){
            paid_by = group_user.username;
        }
        if(group_user.id !== expense.paid_by){
            user_owes = group_user.username;
        }
    }
    return (
        <div>
            <div>{expense.expense_date}</div>
            {clickable ? (
                <div><Link to={`/expenses/${expense.id}`}> {expense.description}</Link></div>
                ) : <div>{expense.description}</div>
            }
            <div>{paid_by} paid ${expense.price}</div>
            <div>{user_owes} owes ${amount_split}</div>
        </div>
    )
};

export default ExpenseTile;
