import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as expenseActions from "../../store/expenses";
import * as balanceActions from "../../store/balance";
import * as friendActions from "../../store/friends";
import * as groupActions from "../../store/groups";

function SettleUp({param_id}) {
    const dispatch = useDispatch();
    const location = useLocation();
    const { closeModal } = useModal();
    const history = useHistory();
    const path_location = location.pathname.split("/");

    const today = new Date();
    const year = today.toLocaleString("default", { year: "numeric" });
    const month = today.toLocaleString("default", { month: "2-digit" });
    const day = today.toLocaleString("default", { day: "2-digit" });
    const dateFormat = year + "-" + month + "-" + day;

    const [price, setPrice] = useState(0);
    const [friend_id, setFriend_id] = useState("");
    const [expense_date, setExpense_date] = useState(dateFormat);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const user = useSelector(state => state.session.user);
    const friendsListArr = useSelector(state => state.friends.friends);
    const expenses = useSelector(state => state.friends.expenses);
    const balance = expenses.balance
    // const allExpenses = useSelector(state => Object.values(state.expenses));

    const acceptedFriendsArr = friendsListArr.filter(el=> el.friend.status === "friends");
    const sortedFriends = acceptedFriendsArr.sort((a,b) => (a.id) - (b.id))
    const selectedFriend = sortedFriends.filter(el=> el.id === param_id)

    if(friend_id === "" && param_id) setFriend_id(param_id);

    // let expences_balance;
    // let balance;
    // let friendArr;
    // if(path_location[1] === "friends"){
    //     friendArr = friendsListArr?.filter(el=> el.id === Number(path_location[2]));
    //     if(friendArr?.length > 0) {
    //         balance = friendArr[0]?.balance
    //     }
    // } else {
    //     expences_balance = []
    // }

    useEffect(() => {
        const errors = [];
        if(price && (price < 1)) errors.push("Price needs to be at least $1");
        if(friend_id === "") errors.push("Please choose a friend to split with");
        if(balance) {
            const abs_balance = Math.abs(balance);
            const fixed = Number(Math.abs(abs_balance)).toFixed(2);
            setPrice(Math.abs(fixed))
        };
        setErrors(errors);
    }, [price, hasSubmitted, friend_id, balance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if(Object.values(errors).length === 0){
        setErrors([]);
        const clear_balance = await dispatch(balanceActions.settle_balance(friend_id));
        if(clear_balance){
            reset();
            dispatch(expenseActions.loadAllUserExpenses());
            // dispatch(balanceActions.loadAllUserExpenseBalance());
            closeModal();
        }
    }
  };
  const reset = () => {
    setPrice(0);
    setFriend_id("");
    setExpense_date(dateFormat);
    setErrors([]);
    setHasSubmitted(false);
  };

  const keepClickHandler = () => {
    closeModal()
  };

  return (
    <>
        <div className="add-expense-form-container">
            <h1>Settle Up</h1>
            {hasSubmitted && errors.length > 0 && (
            <div className="login-form-container-errors">
                <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
                </ul>
            </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="expense-form-input-container">
                    <label>Settle balance with:</label>
                        {selectedFriend.map((friendObj) => {
                            return(
                                <div key={friendObj.id}>
                                    {friendObj.first_name} {friendObj.last_name}
                                </div>
                            )
                        })}
                </div>
                <div className="expense-form-input-container">
                    <label>Settle amt: </label>
                    <div>$ {" "} {price}</div>
                </div>
                <div className="expense-form-input-container">
                    <label>Settle date:</label>
                    <input
                        type="date"
                        value={expense_date}
                        onChange={(e) => setExpense_date(e.target.value)}
                    />
                </div>
                <div className="delete-buttons">
                    <button onClick={keepClickHandler}>Cancel</button>
                    <button className="delete-button-color" type="submit">Save</button>
                </div>
            </form>
        </div>
    </>
  );
}

export default SettleUp;
