import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as expenseActions from "../../store/expenses";
import * as commentActions from "../../store/comments";

function EditComment({comments, expense}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [message, setMessage] = useState(comments.message);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const user = useSelector(state => state.session.user) // Get current logged in user
    // Redirect to landing page if user not logged in
    if (!user) {
        history.push("/")
    }

    let comment_owner;
    if(expense.expense_group_users[0].id === user.id){
        comment_owner = expense.expense_group_users[0].username
    } else {
        comment_owner = expense.expense_group_users[1].username
    }
    const created = new Date(comments.created_at)
    const dateFormat = created.toLocaleDateString()

    const date_values = dateFormat ? dateFormat?.split("/") : "";
    const month = dateFormat ? date_values[0] : "";
    const day = dateFormat ? date_values[1] : "";
    const year = dateFormat ? date_values[2] : "";
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleString('default', { month: 'short' });

    useEffect(() => {
        const errors = [];
        if(user.id !== comments.user_id) errors.push("You do not have access to edit this comment.");
        if(message && message.length > 500) errors.push("Your message needs to be less than 500 characters");
        setErrors(errors);
    }, [user.id, comments.user_id, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const newComment = {message};

    if(Object.values(errors).length === 0){
        setErrors([]);

        const createComment = await dispatch(commentActions.createNewComment(newComment, expense));
        if(createComment.errors){
            const errors = [];
            errors.push(createComment.errors);
            setErrors(errors);
        } else {
            reset();
            dispatch(expenseActions.loadAllUserExpenses());
            setErrors([]);
            closeModal();
        }
    }
  };

  const reset = () => {
    setMessage("");
    setErrors([]);
    setHasSubmitted(false);
  };

  return (
    <>
        {/* <div className="comment-tile"> */}
        {/* <div className="comment-container"> */}
            <div className="comment-left-edit">
                <div className="comment-name-edit">
                    <div className="comment-name">{comment_owner}</div>
                    <div className="month">{monthName}{" "}{day}</div>
                </div>
            {/* </div>
            <div className="comment-left"> */}
                {hasSubmitted && errors.length > 0 && (
                <div className="login-form-container-errors">
                    <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                    </ul>
                </div>
                )}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="comment-form-input-container-edit">
                        <textarea
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            placeholder='Edit your comment'
                            name='message'
                            required
                        />
                    </div>
                    <button type="submit" className="comment-form">Post</button>
                </form>
            </div>
            {/* </div> */}
            {/* </div> */}
    </>
  );
}

export default EditComment;
