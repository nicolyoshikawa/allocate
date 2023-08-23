import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  if (sessionUser) return <Redirect to="/home" />;

  const demoLogin = async (e) => {
    e.preventDefault();
    const data =  await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  }

  return (
    <div>
      <div className="login-form-container">
      <h1>Log In</h1>
        {errors.length > 0 && (
          <div className="login-form-container-errors">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="login-form-input-container">
            <i className="fa-solid fa-user" style={{ color: "#c7c7c7" }}></i>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-form-input-container">
            <i className="fa-solid fa-lock" style={{ color: "#c7c7c7" }}></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
          <button
            type="button"
            className="demo-login-button"
            onClick={demoLogin}
          >
            Demo Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
