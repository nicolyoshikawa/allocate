import { loadAllUserExpenses } from "./expenses";
import { loadExpensesByFriendId } from "./friends";

const RESET_BALANCE = "balances/RESET_BALANCE";
const TOTAL_BALANCE = "balances/TOTAL_BALANCE";
const SETTLE_BALANCE = "balances/SETTLE_BALANCE";

export const RESET_ACTION_BALANCE = () => ({
  type: RESET_BALANCE
})

export const loadTotalBalance = (balance) => ({
    type: TOTAL_BALANCE,
    balance
});
export const settleBalance = (user_id) => ({
  type: SETTLE_BALANCE,
  user_id
});

export const loadAllUserExpenseBalance = () => async (dispatch) => {
  const response = await fetch("/api/expenses/", {
    method: "GET"
  });
  const data = await response.json();
  dispatch(loadTotalBalance(data.balance));
  return response;
};

export const settle_balance = (id) => async (dispatch) => {

  const response = await fetch(`/api/balance/${id}/settle`, {
    method: 'PUT'
  });
  if (response.ok) {
    const res = await response.json();
    dispatch(loadExpensesByFriendId(id))
    dispatch(loadAllUserExpenses())
    return res;
  }
};

const initialState = {};

const balanceReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case TOTAL_BALANCE:
        newState = { ...state, balance: action.balance };
        return newState;
    case RESET_BALANCE:
      return initialState;
    default:
      return newState;
  }
};

export default balanceReducer;
