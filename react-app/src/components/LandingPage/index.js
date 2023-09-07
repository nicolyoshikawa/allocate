import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from "../OpenModalButton";
import "./LandingPage.css"

function LandingPage(){
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
	const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);

    if (sessionUser) history.push("/home")

	return (
        <div className='landingPage'>
            <div className='landing-text'>
                <h1>Less stress when sharing expenses with friends.</h1>
                <div className='landing-middle-text'>
                    <div>Keep track of shared expenses, balances, and who owes who.</div>
                    <div>Quickly add expenses on the go before you forget who paid.</div>
                    <div>Settle your balances with your friends.</div>
                </div>
                <div className='landing-signup'>
                    <OpenModalButton
                        buttonText="Sign Up"
                        className="landing-signup"
                        onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                    />
                </div>
            </div>
            <div className='landing-img'>
                {/* <i className="fa-solid fa-star-of-life fa-bounce" style={{ color: "#808080", fontWeight: "bold" }}></i> */}
                <i className="fa-solid fa-people-group fa-bounce" style={{ color: "#373B3F", fontWeight: "bold" }}></i>
                {/* <i className="fa-solid fa-arrows-split-up-and-left" style={{ color: "#808080", fontWeight: "bold" }}></i> */}
                {/* <i className="fa-solid fa-dollar-sign fa-bounce" style={{ color: "#808080", fontWeight: "bold" }}></i> */}
                <i className="fa-solid fa-file-invoice-dollar fa-bounce" style={{ color: "#373B3F", fontWeight: "bold" }}></i>
                {/* <i className="fa-brands fa-uncharted" style={{ color: "#808080", fontWeight: "bold" }}></i> */}
                {/* <i className="fa-solid fa-comments-dollar" style={{ color: "#808080", fontWeight: "bold" }}></i> */}
            </div>
        </div>
    )
}

export default LandingPage;
