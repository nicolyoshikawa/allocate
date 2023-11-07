import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as expenseActions from "../../store/expenses";
import * as friendActions from "../../store/friends";
import * as groupActions from "../../store/groups";
import * as balanceActions from "../../store/balance";

function AddExpense({expense, param_id, group_object}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const today = new Date();
    const year = today.toLocaleString("default", { year: "numeric" });
    const month = today.toLocaleString("default", { month: "2-digit" });
    const day = today.toLocaleString("default", { day: "2-digit" });
    const dateFormat = year + "-" + month + "-" + day;

    const [receipt_img_url, setReceipt_img_url] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [friend_id, setFriend_id] = useState("");
    const [group_id, setGroup_id] = useState("");
    const [named_group, setNamed_group] = useState([]);
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
    if(friend_id === "" && param_id){
        setFriend_id(param_id)
    }
    if(group_id === "" && group_object){
        setGroup_id(group_object.id)
        let users_in_group = group_object.expense_group_users
        for(let i = 0; i < users_in_group?.length; i++){
            if(users_in_group[i].id !== user.id ){
                setFriend_id(users_in_group[i].id)
            }
        }
    }

    const group_state_arr = useSelector(state => Object.values(state.groups));
    useEffect(()=> {
        let expense_group_users;
        if(group_state_arr?.length > 0){
            const group_array = [];
            for(let i = 0; i < group_state_arr?.length; i++){
                expense_group_users = group_state_arr[i].expense_group_users
                if(expense_group_users[0].id == friend_id || expense_group_users[1].id == friend_id ){
                    group_array.push(group_state_arr[i]);
                }
            }
            setNamed_group(group_array)
        }
    },[friend_id])
    const user_id = user.id;

    useEffect(() => {
        const errors = [];
        if(description && description.length > 500) errors.push("Your description needs to be less than 500 characters");
        if(price && (price < 1)) errors.push("Price needs to be at least $1");
        if(friend_id === "") errors.push("Please choose a friend to split with");
        if(receipt_img_url){
            const img = receipt_img_url.type
            if(img && !img.endsWith("pdf") && !img.endsWith("png") && !img.endsWith("jpg") && !img.endsWith("jpeg")){
                errors.push("Image file type must be pdf, png, jpg, or jpeg");
            }
        }
        setErrors(errors);
    }, [receipt_img_url, description, price, hasSubmitted, friend_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const newExpense = new FormData();
    newExpense.append("description", description);
    newExpense.append("price", price);
    newExpense.append("expense_date", expense_date);
    newExpense.append("friend_id", friend_id);
    newExpense.append("group_id", group_id);
    newExpense.append("paid_by", user_id);
    newExpense.append("receipt_img_url", receipt_img_url);
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

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
                dispatch(expenseActions.loadAllUserExpenses());
                dispatch(groupActions.getGroups())
                dispatch(friendActions.loadExpensesByFriendId(friend_id))
                dispatch(balanceActions.loadAllUserExpenseBalance())
                setErrors([]);
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
    setGroup_id("");
    setExpense_date(dateFormat);
    setErrors([]);
    setHasSubmitted(false);
  };

  return (
    <>
        <div className="add-expense-form-container">
            <h1>Add An Expense</h1>
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
                <div className="expense-form-input-container">
                    <label>Split with:</label>
                    <select name="friends" id="friend-select" onChange={(e) => setFriend_id(e.target.value)}>
                        <option value="">-- Choose a friend --</option>
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
                    <div className="expense-form-input-container">
                        <label>Group: </label>
                        <select name="friends" id="friend-select" onChange={(e) => setGroup_id(e.target.value)}>
                            <option value="">-- No Group --</option>
                                {named_group.map((groupObj) => {
                                    return(
                                        <option
                                            value={groupObj.id}
                                            key={groupObj.id}
                                            required
                                            selected={
                                                (group_id !== null && Number(group_id) == groupObj.id)
                                                || (group_object !== null && Number(group_object?.id) == groupObj.id)
                                            }
                                        >
                                        {groupObj.name}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                <div className="expense-form-input-container">
                    <input
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder='Enter a description'
                        name='description'
                        required
                    />
                </div>
                <div className="expense-form-input-container">
                    <label>Receipt amt: </label>
                    $ {" "}
                    <input
                        type='text'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder='0.00'
                        name='price'
                        required
                    />
                </div>
                <div className="expense-form-input-container">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setReceipt_img_url(e.target.files[0])}
                    />
                </div>
                <div className="expense-form-input-container">
                    <label>Expense date:</label>
                    <input
                        type="date"
                        value={expense_date}
                        onChange={(e) => setExpense_date(e.target.value)}
                    />
                </div>
                <button type="submit">Confirm</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    </>
  );
}

export default AddExpense;
