import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteFriend from "../DeleteFriend";
import * as friendActions from "../../store/friends";

// import "./FriendsPage.css";

const ManageFriend = ({friendObj, sessionUser}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(true);
  const closeMenu = () => setShowMenu(false);
  // const sessionUser = useSelector(state => state.session.user);
  // const friends = useSelector(state => (state.friends.friends));
  // Redirect to landing page if user not logged in
  if (!sessionUser) {
      history.push("/")
  }

  useEffect(() => {
    dispatch(friendActions.getUserFriends());
  }, [dispatch]);

  const handleAccept = async (e, targetId) => {
    e.preventDefault();
    dispatch(friendActions.acceptFriendRequest(targetId));
  };

  return (
    <div className='manage-friend-bar-container'>
      Manage Friend
      <div className="friends-container">
        <div>
          <ul className="friends-list">
            { (friendObj.friend.status === "pending") && (friendObj.friend.sender_id !== sessionUser.id) ? (
              <li key={friendObj.id}>
                <div className="friend-buttons">
                  <button onClick={(e) => handleAccept(e, friendObj.id)}>
                    Accept
                  </button>
                </div>
                <div>
                  <div className="expense-edit-button">
                        <OpenModalButton
                            buttonText="Reject"
                            onItemClick={closeMenu}
                            modalComponent={<DeleteFriend friendObjId={friendObj.id} deleteword={"reject"}/>}
                        />
                  </div>
                </div>
              </li>

            ) : (friendObj.friend.status === "pending") && (friendObj.friend.sender_id === sessionUser.id) ? (
              <li>
                <div className="not-friends-yet">
                  You are not friends yet. Please remind your friend to accept your friend request.
                </div>
                <div className="expense-edit-button">
                        <OpenModalButton
                            buttonText="Remove Request"
                            onItemClick={closeMenu}
                            modalComponent={<DeleteFriend friendObjId={friendObj.id} deleteword={"remove"}/>}
                        />
                </div>
              </li>
            ) : (friendObj.friend.status === "friends") ? (
              <li key={friendObj.id}>
                <div className="expense-edit-button">
                        <OpenModalButton
                            buttonText="Unfriend"
                            onItemClick={closeMenu}
                            modalComponent={<DeleteFriend friendObjId={friendObj.id} deleteword={"remove"}/>}
                        />
                </div>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageFriend;
