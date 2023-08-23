import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import ViewFriends from "../Friends";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile-button">
      {user && (
        <>
          <button onClick={openMenu}>
            <i className="fas fa-user-circle" />{" "}
            {user.first_name} {user.last_name}
          </button>
          <ul className={ulClassName} ref={ulRef}>
              <>
                <li>{user.username}</li>
                <li>{user.email}</li>
                <ViewFriends/>
                <li>
                  <button onClick={handleLogout}>Log Out</button>
                </li>
              </>
          </ul>
          </>
      )}
    </div>
  );
}

export default ProfileButton;
