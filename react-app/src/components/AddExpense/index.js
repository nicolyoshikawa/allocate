import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as expenseActions from "../../store/expenses";
import * as friendActions from "../../store/friends";

function AddExpense({expense, param_id}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const today = new Date();
    const year = today.toLocaleString("default", { year: "numeric" });
    const month = today.toLocaleString("default", { month: "2-digit" });
    const day = today.toLocaleString("default", { day: "2-digit" });
    const dateFormat = year + "-" + month + "-" + day;

    const [receipt_img_url, setReceipt_img_url] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [friend_id, setFriend_id] = useState("");
    const [group_id, setGroup_id] = useState("");
    const [expense_date, setExpense_date] = useState(dateFormat);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const user = useSelector(state => state.session.user);
    const friendsListArr = useSelector(state => state.friends.friends);
    const acceptedFriendsArr = friendsListArr.filter(el=> el.friend.status === "friends");
    const sortedFriends = acceptedFriendsArr.sort((a,b) => (a.id) - (b.id))

    let expLength = 0;
    if(expense){
        expLength = Object.keys(expense).length;
    }

    const user_id = user.id;

    useEffect(()=> {
        dispatch(friendActions.getUserFriends())
        dispatch(expenseActions.loadExpenseById(expense?.id))
        .then((expObj)=>{
            if(expObj){
                const friendArr = expObj.expense_group_users.filter(el=> el.id !== user_id);
                setReceipt_img_url(expObj.receipt_img_url);
                setDescription(expObj.description);
                setPrice(expObj.price);
                setGroup_id(expObj.group_id);
                setExpense_date(expObj.expense_date);
                setFriend_id(friendArr[0].id)
            }
        })
    },[dispatch, expense?.id, expense?.receipt_img_url, expense?.description, expense?.price, expense?.group_id, expense?.expense_date, user_id]);

    useEffect(() => {
        const errors = [];
        if(description && description.length > 500) errors.push("Your description needs to be less than 500 characters");
        if(price && (price < 1)) errors.push("Price needs to be at least $1");
        if(receipt_img_url && (!receipt_img_url.endsWith(".png") &&
            !receipt_img_url.endsWith(".jpg") && !receipt_img_url.endsWith(".jpeg"))) {
            errors.push("Image URL must end in .png, .jpg, or .jpeg");
        }
        if(receipt_img_url && receipt_img_url.length > 255) {
            errors.push("Image URL needs to be under 255 characters");
        }
        setErrors(errors);
    }, [receipt_img_url, description, price, hasSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const newExpense = {description, price, receipt_img_url, expense_date, friend_id, paid_by: user_id};
    const updateExpense = {id: expense?.id, description, price, receipt_img_url, expense_date, friend_id, paid_by: user_id};

    if(Object.values(errors).length === 0){
        setErrors([]);

        if(expLength === 0){
            const createExpense = await dispatch(expenseActions.createANewExpense(newExpense));
            if(createExpense.errors){
                const errors = [];
                errors.push(createExpense.errors);
                setErrors(errors);
            } else {
                reset();
                history.push(`/expenses/${createExpense.id}`);
                setErrors([]);
                closeModal();
            }
        }
        if(expLength > 0){
            const updatedExpense = await dispatch(expenseActions.updateAnExpense(updateExpense));
            if(updatedExpense.errors){
                const errors = [];
                errors.push(updatedExpense.errors);
                setErrors(errors);
            } else {
                reset();
                history.push(`/expenses/${updatedExpense.id}`);
                dispatch(expenseActions.loadExpenseById(updatedExpense.id))
                closeModal();
            }
        }
    }
  };

  const reset = () => {
    setReceipt_img_url("")
    setDescription("");
    setPrice("");
    setFriend_id("");
    setGroup_id(0);
    setExpense_date(dateFormat);
    setErrors([]);
    setHasSubmitted(false);
  };

  return (
    <>
        <div>
            {expLength > 0 ? <h1>Edit Expense</h1> : <h1>Add An Expense</h1>}
            {hasSubmitted && errors.length > 0 && (
            <div>
                <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
                </ul>
            </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Split with: </label>
                    <select name="friends" id="friend-select" onChange={(e) => setFriend_id(e.target.value)}>
                        <option value="">--Please choose a friend--</option>
                        {sortedFriends.map((friendObj) => {
                            return(
                                <option
                                    value={friendObj.id}
                                    key={friendObj.id}
                                    required
                                    selected={
                                        (friend_id !== null && Number(friend_id) === friendObj.id) ||
                                        (param_id !== null && Number(param_id) === friendObj.id)
                                    }
                                >
                                {friendObj.first_name} {friendObj.last_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                {/* <div>
                    <label>Group</label>
                    <input
                        type='text'
                        onChange={(e) => setGroup_id(e.target.value)}
                        value={group_id}
                        placeholder='Group'
                        name='group_id'
                    />
                </div> */}
                <div>
                    <input
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder='Enter a description'
                        name='description'
                        required
                    />
                </div>
                <div>$
                    <input
                        type='text'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder='0.00'
                        name='price'
                        required
                    />
                </div>
                <div>
                    <input
                        type='text'
                        onChange={(e) => setReceipt_img_url(e.target.value)}
                        value={receipt_img_url}
                        placeholder='Receipt Image'
                        name='receipt_img_url'
                    />
                </div>
                <div>
                    <label>Expense date: </label>
                    <input
                        type="date"
                        value={expense_date}
                        onChange={(e) => setExpense_date(e.target.value)}
                    />
                </div>
                <button type="submit">Confirm</button>
            </form>
        </div>
    </>
  );
}

export default AddExpense;
