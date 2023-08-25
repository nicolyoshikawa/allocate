import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as friendActions from "../../store/friends";

function InviteFriend(){
    const dispatch = useDispatch();
    const [friend_request, setFriend_request] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleRequest = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if(Object.values(errors).length === 0){
            const res = await dispatch(friendActions.requestFriendRequest(friend_request));
            if(res.errors){
                const errors = [];
                errors.push(res.errors);
                setErrors(errors);
            } else {
                reset();
            }
        }
    };

    const reset = () => {
        setErrors([]);
        setFriend_request("")
        setHasSubmitted(false);
    };

	return (
        <>
            <div className='side-bar-table'>Invite Friend</div>
            {hasSubmitted && errors.length > 0 && (
            <div className="login-form-container-errors">
                <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
                </ul>
            </div>
            )}
            <form onSubmit={handleRequest}>
                <div>
                    <input
                        placeholder="Enter an email address"
                        onChange={(e) => setFriend_request(e.target.value)}
                        value={friend_request}
                        type='text'
                        name='friend_id'
                        required
                    />
                </div>
                <button type="submit">Send Invite</button>
            </form>
        </>
	);
}

export default InviteFriend;
