import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as expenseActions from "../../store/expenses";

function DeleteExpense({expense}) {
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
    if(user.id !== expense.paid_by) errors.push("You do not have access to delete this expense.");
    setErrors(errors);
  }, [user.id, expense.paid_by]);

  const deleteClickHandler = async () => {
    const expenseDeleted = await dispatch(expenseActions.deleteExpense(expense.id));

    if (expenseDeleted) {
        history.push("/home");
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
            <div className="delete-input-container">Are you sure you want to delete this expense?</div>
            <div className="delete-buttons">
              <button className="delete-button-color" onClick={deleteClickHandler}>Yes</button>
              <button onClick={keepClickHandler}>No</button>
            </div>
          </div>
        )}
      </>
    );
}
export default DeleteExpense;
