import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as friendActions from "../../store/friends";

function DeleteFriend({friendObjId, deleteword}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(true);
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user) // Get current logged in user
  // Redirect to landing page if user not logged in
  if (!user) {
      history.push("/")
  }

  const handleDelete = async (e, friendObjId) => {
    e.preventDefault();
    const friendDeleted = await dispatch(friendActions.deleteFriend(friendObjId));
    if (friendDeleted) {
        history.push("/home");
        closeModal()
    };
  };

  const keepClickHandler = () => {
    setShowModal(false);
    closeModal()
  }
    return (
      <>
        {showModal && (
          <div>
            <h2>Confirm Delete</h2>
            {errors.length > 0 && <p>{errors}</p>}
            <div>Are you sure you want to {deleteword} this friend?</div>
            <button onClick={(e) => handleDelete(e, friendObjId)}>Yes</button>
            <button onClick={keepClickHandler}>No</button>
          </div>
        )}
      </>
    );
}
export default DeleteFriend;
