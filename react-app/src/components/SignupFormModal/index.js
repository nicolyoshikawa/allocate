import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";

import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password, first_name, last_name));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};
    useEffect(()=> {
        const errors = [];
        setErrors(errors);
	},[username, email, password, first_name, last_name])

	if (sessionUser) return <Redirect to="/home" />;

	return (
		<div className="signup-page-container">
			<div className="signup-form-container">
      		<h1>Sign Up</h1>
			{errors.length > 0 && (
				<div className="signup-form-container-errors">
				<ul>
					{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
					))}
				</ul>
				</div>
			)}
		  <form onSubmit={handleSubmit}>
			<p className="signup-form-required-text">
			  All fields below are required unless specified
			</p>
			<div className="signup-form-input-group-names">
				<input
					type="text"
					placeholder="First Name"
					value={first_name}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Last Name"
					value={last_name}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
			</div>
			<div className="signup-form-input-group">
				<div className="signup-form-input-container">
					<i className="fa-solid fa-user" style={{ color: "#c7c7c7" }}></i>
					<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					/>
				</div>
				<div className="signup-form-input-container">
					<i className="fa-solid fa-envelope" style={{ color: "#c7c7c7" }}></i>
					<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					/>
				</div>
			</div>
			{/* <p className="signup-form-password-text"> */}
			{/* <p> */}
			  {/* Avoid using common words and include a mix of letters and numbers. */}
			{/* </p> */}
			<div className="signup-form-input-group">
				<div className="signup-form-input-container">
					<i className="fa-solid fa-lock" style={{ color: "#c7c7c7" }}></i>
					<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					/>
				</div>
				<div className="signup-form-input-container">
					<i className="fa-solid fa-lock" style={{ color: "#c7c7c7" }}></i>
					<input
					type="password"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					/>
				</div>
			</div>
			<button type="submit" className="signup-button">
			  Create Account
			</button>
		  </form>
		</div>
	  </div>
	);
}

export default SignupFormModal;
