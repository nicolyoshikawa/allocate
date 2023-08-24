import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as friendActions from "../../store/friends";
import CreateExpenseModal from '../CreateExpenseModal';

function FriendDetail(){
    const { id } = useParams();
    const param_id = Number(id);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);

    const sessionUser = useSelector(state => state.session.user);
    const friendsListArr = useSelector(state => state.friends.friends);
    const friendArr = friendsListArr?.filter(el=> el.id === param_id);
    const friendObj = friendArr[0]

    if (!sessionUser) {
        history.push("/")
    }

    useEffect(()=> {
        if(sessionUser){
            dispatch(friendActions.getUserFriends())
            .then(()=>setIsLoaded(true))
        }
    },[dispatch, sessionUser]);

    let friend_status;
    if(friendObj.friend.status == "friends"){
        friend_status = ""
    } else {
        friend_status = "invite pending"
    }

	return (
        <>
            {isLoaded && sessionUser && (
                <>
                    <div className="middle">
                        <div className='expense-bar-container'>
                            <h2 className='expense-bar'>{friendObj.first_name} {friendObj.last_name}</h2>
                            <div>{friend_status}</div>
                            {!friend_status ? (<div className='expense-bar'><CreateExpenseModal/></div>) : <div></div>}
                        </div>
                    </div>
                </>
            )}
        </>
	);
}

export default FriendDetail;
