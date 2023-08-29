import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as friendActions from "../../store/friends";

// import "./FriendsPage.css";

const ManageFriend = ({friendObj, sessionUser}) => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const handleDelete = async (e, targetId) => {
    e.preventDefault();
    dispatch(friendActions.deleteFriend(targetId));
  };

  return (
    <div className='manage-friend-bar-container'>
      Manage Friend
      <div className="friends-container">
        <div className="friends-card">
          <ul className="friends-list">
            { (friendObj.friend.status === "pending") && (friendObj.friend.sender_id !== sessionUser.id) ? (
              <li key={friendObj.id}>
                <div className="friend-info">
                  {/* <img
                    src={friendObj.user_img_url}
                    alt={friendObj.username}
                    className="friend-img"
                  /> */}
                  <div className="friend-details">
                    {/* <div className="friend-name">
                      {friendObj.first_name} {friendObj.last_name}
                    </div> */}
                    {/* <div className="friend-username">{friendObj.username}</div> */}
                  </div>
                </div>
                <div className="friend-buttons">
                  <button onClick={(e) => handleAccept(e, friendObj.id)}>
                    Accept
                  </button>
                  <button onClick={(e) => handleDelete(e, friendObj.id)}>
                    Reject
                  </button>
                </div>
              </li>

            ) : (friendObj.friend.status === "pending") && (friendObj.friend.sender_id === sessionUser.id) ? (
              <>
                <div>You are not friends yet. Please remind your friend to accept your friend request.</div>
                <button onClick={(e) => handleDelete(e, friendObj.id)}>Remove Request</button>
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className="friends-card">
          <ul className="friends-list">
            { friendObj.friend.status === "friends" ? (
              <li key={friendObj.id}>
                <div className="friend-info">
                  {/* <img
                    src={friendObj.user_img_url}
                    alt={friendObj.username}
                    className="friend-img"
                  /> */}
                  <div className="friend-details">
                    {/* <div className="friend-name">
                      {friendObj.first_name} {friendObj.last_name}
                    </div> */}
                    {/* <div className="friend-username">{friendObj.username}</div> */}
                  </div>
                </div>
                <button onClick={(e) => handleDelete(e, friendObj.id)}>Unfriend</button>
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
