import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import * as friendActions from "../../store/friends";
import CreateExpenseModal from '../CreateExpenseModal';
import ExpenseTile from '../ExpenseTile';
import * as expenseActions from "../../store/expenses";

function FriendDetail(){
    const { id } = useParams();
    const param_id = Number(id);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);

    const sessionUser = useSelector(state => state.session.user);
    const friendsListArr = useSelector(state => state.friends.friends);
    const friendArr = friendsListArr?.filter(el=> el.id === param_id);

    const allExpenses = useSelector(state => Object.values(state.expenses));
    const sortedExpenses = allExpenses.sort((a,b) => new Date(b.expense_date) - new Date(a.expense_date))

    let friendObj;
    let friendGroupArr;
    if(friendArr) {
        friendObj = friendArr[0];
        friendGroupArr = friendArr[0].group_id
    }

    let friendExpenses;
    if(friendGroupArr) friendExpenses = sortedExpenses.filter(el=> el.group_id === friendGroupArr[0]);

    if (!sessionUser) {
        history.push("/")
    }

    useEffect(()=> {
        if(sessionUser){
            // dispatch(friendActions.getUserFriends())
            // .then(()=>setIsLoaded(true))
            dispatch(expenseActions.loadAllUserExpenses())
            .then(()=>setIsLoaded(true))
        }

    },[dispatch, sessionUser]);

    let friend_status;
    if(friendObj?.friend.status === "friends"){
        friend_status = ""
    } else {
        friend_status = "invite pending"
    }

	return (
        <>
            {isLoaded && sessionUser && friendObj &&(
                <>
                    <div className="middle">
                        <div className='expense-bar-container'>
                            <h2 className='expense-bar'>{friendObj.first_name} {friendObj.last_name}</h2>
                            <div>{friend_status}</div>
                            {!friend_status ? (
                                <>
                                    <div className='expense-bar'><CreateExpenseModal param_id={param_id}/></div>
                                </>
                            ) : <div></div>}
                        </div>
                        {!friend_status ? (
                            friendExpenses.length > 0 ? (
                                friendExpenses.map(el => (<ExpenseTile key={el.id} expense={el} clickable={true}/>))
                                ) : (
                                    <div>You and {friendObj.first_name} {friendObj.last_name} are all settled up.</div>
                            )
                        ) : (
                            <div>You aren't friends yet. Remind your friend to accept their request!</div>
                        )}
                    </div>
                </>
            )}
        </>
	);
}

export default FriendDetail;