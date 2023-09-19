import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as expenseActions from "../../store/expenses";
import * as commentActions from "../../store/comments";

function AddComment({expense}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        if(message && message.length > 500) errors.push("Your message needs to be less than 500 characters");
        setErrors(errors);
    }, [message]);

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
        <div className="">
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
                <div className="comment-form-input-container">
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        placeholder='Add a comment'
                        name='message'
                        required
                    />
                </div>
                <button type="submit" className="comment-form">Post</button>
            </form>
        </div>
    </>
  );
}

export default AddComment;
