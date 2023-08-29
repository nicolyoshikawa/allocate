import { NavLink} from "react-router-dom";
import FriendsList from "../FriendsList";
import InviteFriend from "../InviteFriend";

function NavSideBar() {
  return (
    <div className="sidebar">
      <div className='side-bar-list'>
        <NavLink activeClassName="selected" activeStyle={{ color: "#5bc5a7", fontWeight: "bold"}} exact to="/home">
          All Expenses
        </NavLink>
      </div>
        <FriendsList/>
        <InviteFriend/>
    </div>
  );
}

export default NavSideBar;
