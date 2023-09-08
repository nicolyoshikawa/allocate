import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
// import piechart from "../../assets/piechart.png";
import './Navigation.css';
import Info from './info';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);
	return (
		<div className="navbar-container">
			<div>
				<NavLink exact to="/" className="home-button">
					<i className="fa-solid fa-chart-pie" style={{ color: "#ffffff" }}></i>
					{" "}
					Allocate
				</NavLink>

			</div>
			{isLoaded && !sessionUser && showMenu &&(
				<div className="navbar">
					<div>
						<OpenModalButton
							buttonText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>
					</div>
					<div>
						<OpenModalButton
							buttonText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</div>
				</div>
			)}
			{isLoaded && sessionUser && (
				<div className='profile-info'>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
