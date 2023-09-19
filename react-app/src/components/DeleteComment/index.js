import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as commentActions from "../../store/comments";

function DeleteComment({comments, expense}) {
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

  useEffect(() => {
    const errors = [];
    if(user.id !== comments.user_id) errors.push("You do not have access to delete this comment.");
    setErrors(errors);
  }, [user.id, comments.user_id]);

  const deleteClickHandler = async () => {
    const commentDeleted = await dispatch(commentActions.deleteComment(comments.id, expense));

    if (commentDeleted) {
        closeModal()
    };
  }

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
            <div className="delete-input-container">Are you sure you want to delete this comment?</div>
            <div className="delete-buttons">
              <button className="delete-button-color" onClick={deleteClickHandler}>Yes</button>
              <button onClick={keepClickHandler}>No</button>
            </div>
          </div>
        )}
      </>
    );
}
export default DeleteComment;
