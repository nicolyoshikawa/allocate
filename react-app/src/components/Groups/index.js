import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import * as groupActions from "../../store/groups";
import AddGroup from '../AddGroup';

function Groups(){
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const groupsState = useSelector(state => Object.values(state.groups));
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);
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
                    <div className='groups'>
                        <div className=''>Groups</div>
                        <div className="add-group">
                        <OpenModalButton
                            buttonText="+ add"
                            onItemClick={closeMenu}
                            modalComponent={<AddGroup />}
                        />
                    </div>
                    </div>
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
