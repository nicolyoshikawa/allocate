import { NavLink} from "react-router-dom";
import FriendsList from "../FriendsList";
import InviteFriend from "../InviteFriend";

function NavSideBar() {
  return (
    <div className="sidebar">
      <div className='all-expenses'>
        <NavLink activeClassName="selected" activeStyle={{ color: "#5bc5a7", fontWeight: "bold"}} exact to="/home">
          <i class="fa-solid fa-ellipsis-vertical" style={{ color: "#808080", fontWeight: "bold" }}></i>
          <i class="fa-solid fa-bars" style={{ color: "#808080" , fontWeight: "bold" }} ></i>
          {" "}
          All Expenses
        </NavLink>
      </div>
        <FriendsList/>
        <InviteFriend/>
    </div>
  );
}

export default NavSideBar;
