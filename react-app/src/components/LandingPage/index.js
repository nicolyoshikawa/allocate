import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./LandingPage.css"

function LandingPage(){
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) history.push("/home")

	return (
        <div className='landingPage'>
            <h1>Less stress when sharing expenses</h1>
        </div>
    )
}

export default LandingPage;
