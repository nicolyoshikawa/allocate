import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Info() {
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

    const ulClassName = "info-dropdown" + (showMenu ? "" : " hidden");

    return (
      <div className="profile-button">
          <>
            <button onClick={openMenu}>
                <i class="fa-solid fa-circle-info" style={{ color: "#ffffff" }}></i>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <>
                    <a href={"https://www.linkedin.com/in/nicol-yoshikawa/"} target="_blank">
                        <i class="fa-brands fa-linkedin"></i>
                    </a>
                    <a href={"https://github.com/nicolyoshikawa"} target="_blank">
                        <i class="fa-brands fa-github"></i>
                    </a>
                </>
            </ul>
            </>
      </div>
    );
  }

export default Info;
