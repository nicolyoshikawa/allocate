import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as friendActions from "../../store/friends";
import ManageExpenses from '../ManageExpenses';

function ViewFriends(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const friendsArr = useSelector(state => state.friends);
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) {
        history.push("/")
    }

    useEffect(()=> {
        if(sessionUser){
            dispatch(friendActions.getUserFriends())
            .then(()=>setIsLoaded(true))
        }
    },[dispatch, sessionUser]);
	return (
        <>
            {isLoaded && sessionUser && (
                <div className="middle">
                    <div className='expense-bar-container'>
                        <h2 className='expense-bar'>Friends</h2>
                    </div>
                </div>
            )}
        </>
	);
}

export default ViewFriends;
