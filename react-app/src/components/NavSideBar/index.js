import { NavLink, useHistory} from "react-router-dom";
import { useSelector } from "react-redux";
import FriendsList from "../FriendsList";
import InviteFriend from "../InviteFriend";
import Groups from "../Groups";

function NavSideBar({ isLoaded }) {
  const user = useSelector(state => state.session.user);
  const history = useHistory();

  if (!user) {
    history.push("/")
  }

  return (
    <>
      {isLoaded && user && (
        <div className="sidebar">
          <div className='all-expenses'>
            <NavLink activeClassName="selected" activeStyle={{ color: "#5bc5a7", fontWeight: "bold"}} exact to="/home">
              <i className="fa-solid fa-list" style={{ color: "#808080", fontWeight: "bold" }}></i>
              {" "}
              All Expenses
            </NavLink>
          </div>
            <Groups/>
            <FriendsList/>
            <InviteFriend/>
            <div className="info-nav-side-bar">
              <a href={"https://www.linkedin.com/in/nicol-yoshikawa/"} target="_blank">
                  <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href={"https://github.com/nicolyoshikawa"} target="_blank">
                  <i className="fa-brands fa-github"></i>
              </a>
            </div>
        </div>
      )}
    </>
  );
}

export default NavSideBar;
