const RESET_BALANCE = "balances/RESET_BALANCE";
const TOTAL_BALANCE = "balances/TOTAL_BALANCE";

export const RESET_ACTION_BALANCE = () => ({
  type: RESET_BALANCE
})

export const loadTotalBalance = (balance) => ({
    type: TOTAL_BALANCE,
    balance
});

export const loadAllUserExpenseBalance = () => async (dispatch) => {
  const response = await fetch("/api/expenses/", {
    method: "GET"
  });
  const data = await response.json();
  dispatch(loadTotalBalance(data.balance));
  return response;
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
