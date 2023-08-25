import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as friendActions from "../../store/friends";

function Balance(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) {
        history.push("/")
    }

    // useEffect(()=> {
    //     if(sessionUser){
    //         dispatch(friendActions.getUserFriends())
    //         .then(()=>setIsLoaded(true))
    //     }
    // },[dispatch, sessionUser]);
	return (
        <>
            {sessionUser && (
                <div className="sidebar">
                    <div className='side-bar-table'>Balance</div>
                    <div className="table-list">
                        Coming soon...
                    </div>
                </div>
            )}
        </>
	);
}

export default Balance;
