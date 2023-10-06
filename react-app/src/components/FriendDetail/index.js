import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import * as friendActions from "../../store/friends";
import CreateExpenseModal from '../CreateExpenseModal';
import ExpenseTile from '../ExpenseTile';
import * as expenseActions from "../../store/expenses";
import ManageFriend from '../ManageFriend';
import checkmark from "../../assets/checkmark-circle.png"

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
        friendGroupArr = friendArr[0]?.group_id
    }

    let friendExpenses;
    if(friendGroupArr) friendExpenses = sortedExpenses.filter(el=> friendGroupArr.includes(el.group_id));
    if (!sessionUser) {
        history.push("/")
    }

    useEffect(()=> {
        if(sessionUser){
            dispatch(expenseActions.loadAllUserExpenses())
            .then(()=>setIsLoaded(true))
        }

    },[dispatch, sessionUser, friendObj]);

    let friend_status;
    if(friendObj?.friend.status === "friends"){
        friend_status = ""
    } else {
        friend_status = "invite pending"
    }

	return (
        <>
            {sessionUser && friendObj ? (
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
                        <div><ManageFriend friendObj={friendObj} sessionUser={sessionUser}/></div>
                        {!friend_status ? (
                            friendExpenses.length > 0 ? (
                                friendExpenses.map(el => (<ExpenseTile key={el.id} expense={el} clickable={true} sessionUser={sessionUser} displayGroup={true}/>))
                                ) : (
                                    <>
                                        <div className='allSettledUp'>
                                            <img src={checkmark} alt="all_settled_img" />
                                        </div>
                                        <div className="settled-tab">You and {friendObj.first_name} {friendObj.last_name} are all settled up.</div>
                                    </>
                            )
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                </>
            ):(
                <>
                    <div className="middle">
                        <div className='expense-bar-container'>
                            <h1>Friend Not Found</h1>
                        </div>
                    </div>
                </>
            )}
        </>
	);
}

export default FriendDetail;
