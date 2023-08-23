import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function LandingPage(){
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) history.push("/home")

	return (
        <>
            <h1> No Session user</h1>
        </>
    )
}

export default LandingPage;
