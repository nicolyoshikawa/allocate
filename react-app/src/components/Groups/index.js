import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as groupActions from "../../store/groups";

function Groups(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const groupsState = useSelector(state => Object.values(state.groups));
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) {
        history.push("/")
    }

    useEffect(()=> {
        if(sessionUser){
            dispatch(groupActions.getGroups())
            .then(()=>setIsLoaded(true))
        }
    },[dispatch, sessionUser]);
	return (
        <>
            {isLoaded && sessionUser && (
                <div>
                    <div className='side-bar-table'>Groups</div>
                    {groupsState.map((groupObj) => {
                        return (
                            <div className="table-list" key={groupObj.id}>
                                <i className="fa-solid fa-tag" style={{ color: "#c7c7c7" }}></i>
                                {" "}
                                <NavLink
                                    to={`/groups/${groupObj.id}`}
                                    activeClassName="selected"
                                    activeStyle={{ color: "#5bc5a7", fontWeight: "bold"}}
                                >
                                    {groupObj.name}
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
	);
}

export default Groups;
