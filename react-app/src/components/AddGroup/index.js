import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as expenseActions from "../../store/expenses";
import * as friendActions from "../../store/friends";
import * as groupActions from "../../store/groups";

function AddGroup() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState("");
    const [friend_id, setFriend_id] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const friendsListArr = useSelector(state => state.friends.friends);
    const acceptedFriendsArr = friendsListArr.filter(el=> el.friend.status === "friends");
    const sortedFriends = acceptedFriendsArr.sort((a,b) => (a.id) - (b.id))

    useEffect(() => {
        const errors = [];
        if(name && name.length > 50) errors.push("Your group name needs to be less than 50 characters");
        if(friend_id === "") errors.push("Please choose a friend to add to the group");
        setErrors(errors);
    }, [name, friend_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const newGroup = {name, friend_id};

        if(Object.values(errors).length === 0){
            setErrors([]);

            const createGroup = await dispatch(groupActions.createNewGroup(newGroup));
            if(createGroup.errors){
                const errors = [];
                errors.push(createGroup.errors);
                setErrors(errors);
            } else {
                reset();
                dispatch(groupActions.getGroups());
                dispatch(friendActions.getUserFriends());
                closeModal();
            }
        }
      };

  const reset = () => {
    setName("");
    setFriend_id("");
  };

    // useEffect(() => {
    //     const errors = [];
    //     setErrors(errors);
    // }, [hasSubmitted]);

  return (
    <>
        <div className="add-expense-form-container">
            <h1>Start a new group:</h1>
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
                    <label>Group Members:</label>
                    <select name="friends" id="friend-select" onChange={(e) => setFriend_id(e.target.value)}>
                        <option value="">-- Choose a friend --</option>
                        {sortedFriends.map((friendObj) => {
                            return(
                                <option
                                    value={friendObj.id}
                                    key={friendObj.id}
                                    required
                                    selected={
                                        (friend_id !== null && Number(friend_id) === friendObj.id)
                                    }
                                >
                                {friendObj.first_name} {friendObj.last_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="expense-form-input-container">
                    <label>Group name: </label>
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder='name the group'
                        name='name'
                        required
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    </>
  );
}

export default AddGroup;
