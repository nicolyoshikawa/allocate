import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as friendActions from "../../store/friends";
import * as groupActions from "../../store/groups";

function DeleteFriend({friendObjId, deleteword, friendObj}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user);
  const allExpenses = useSelector(state => Object.values(state.expenses));
  // Redirect to landing page if user not logged in
  if (!user) {
      history.push("/")
  }

  const group_users_arr = allExpenses.filter(el => el.expense_group_users[0].id === friendObjId || el.expense_group_users[1].id === friendObjId)

  const handleDelete = async (e, friendObjId) => {
    e.preventDefault();
    if(group_users_arr.length > 0){
      const errors = [];
      errors.push("Please settle the balance first.");
      setErrors(errors);
    } else {
      const friendDeleted = await dispatch(friendActions.deleteFriend(friendObjId));
      if (friendDeleted) {
          history.push("/home");
          dispatch(groupActions.getGroups());
          closeModal()
      };
    }
  };

  const keepClickHandler = () => {
    setShowModal(false);
    closeModal()
  }
    return (
      <>
        {showModal && (
          <div className="delete-container">
            <h2>Confirm Delete</h2>
            {errors.length > 0 && (
                <div className="login-form-container-errors">
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="delete-input-container">Are you sure you want to {deleteword} this friend?</div>
            <div className="delete-buttons">
                <button className="delete-button-color" onClick={(e) => handleDelete(e, friendObjId)}>Yes</button>
                <button onClick={keepClickHandler}>No</button>
            </div>
          </div>
        )}
      </>
    );
}
export default DeleteFriend;
