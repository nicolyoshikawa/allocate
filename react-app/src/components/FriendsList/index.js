import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as friendActions from "../../store/friends";

function FriendsList(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const friendsState = useSelector(state => (state.friends));
    const friendsArr = friendsState.friends;
    const sortedFriends = friendsArr?.sort((a,b) => (a.id) - (b.id))
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
                <div>
                    <div className='side-bar-table'>Friends List</div>
                    {sortedFriends.map((friendObj) => {
                        return (
                            <div className="table-list" key={friendObj.id}>
                                <i className="fa-solid fa-user" style={{ color: "#c7c7c7" }}></i>
                                {" "}
                                <NavLink
                                    to={`/friends/${friendObj.id}`}
                                    activeClassName="selected"
                                    activeStyle={{ color: "#5bc5a7", fontWeight: "bold"}}
                                >
                                    {friendObj.first_name} {friendObj.last_name}
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
