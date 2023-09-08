import { NavLink} from "react-router-dom";
import FriendsList from "../FriendsList";
import InviteFriend from "../InviteFriend";
// import Info from "../Navigation/info";

function NavSideBar() {
  return (
    <div className="sidebar">
      <div className='all-expenses'>
        <NavLink activeClassName="selected" activeStyle={{ color: "#5bc5a7", fontWeight: "bold"}} exact to="/home">
          <i className="fa-solid fa-list" style={{ color: "#808080", fontWeight: "bold" }}></i>
          {" "}
          All Expenses
        </NavLink>
      </div>
        <FriendsList/>
        <InviteFriend/>
        <div className="info-nav-side-bar">
          <a href={"https://www.linkedin.com/in/nicol-yoshikawa/"} target="_blank">
              <i class="fa-brands fa-linkedin"></i>
          </a>
          <a href={"https://github.com/nicolyoshikawa"} target="_blank">
              <i class="fa-brands fa-github"></i>
          </a>
        </div>
    </div>
  );
}

export default NavSideBar;
