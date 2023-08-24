import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as friendActions from "../../store/friends";

function FriendsList(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    // const friendsArr = useSelector(state => state.friends);
    const sessionUser = useSelector(state => state.session.user);
    const friendsArr = ["friend1", "friend2", "friend3"]
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
                <div>
                    <div className='side-bar-table'>Friends List</div>
                        {friendsArr.map((friend) => {
                            return (
                                <div className="table-list" key={friend.id}>
                                    <NavLink to="/friends" activeClassName="selected" activeStyle={{ color: "#5bc5a7", fontWeight: "bold" }}>
                                        {friend}
                                    </NavLink>
                                </div>
                            )
                        })}
                </div>
            )}
        </>
	);
}

export default FriendsList;
