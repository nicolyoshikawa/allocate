const LOAD_EXPENSES = "expenses/LOAD_EXPENSES";
const EXPENSE_BY_ID = "expenses/EXPENSE_BY_ID";
// const CREATE_A_DRINK = "drinks/CREATE_A_DRINK";
// const UPDATE_A_DRINK = "drinks/UPDATE_A_DRINK";
const DELETE_AN_EXPENSE = "expenses/DELETE_AN_EXPENSE";

export const loadExpenses = (expenses) => ({
    type: LOAD_EXPENSES,
    expenses
});

export const expenseById = (expense) => ({
  type: EXPENSE_BY_ID,
  expense
});

// export const createADrink = (drink) => ({
//   type: CREATE_A_DRINK,
//   drink
// });

// export const editADrink = (drink) => ({
//   type: UPDATE_A_DRINK,
//   drink,
// });

export const deleteAnExpense = (expenseId) => ({
  type: DELETE_AN_EXPENSE,
  expenseId
});

export const loadAllUserExpenses = () => async (dispatch) => {
  const response = await fetch("/api/expenses/", {
    method: "GET"
  });
  const data = await response.json();
  dispatch(loadExpenses(data.expenses));
  return response;
};

export const loadExpenseById = (id) => async (dispatch) => {
  const response = await fetch(`/api/expenses/${id}`, {
    method: "GET"
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(expenseById(data));
  }
  return data
};

// export const createNewDrink = (drink) => async (dispatch) => {
//   const response = await fetch('/api/drinks/', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json'},
//     body: JSON.stringify(drink)
//   });

//   const data = await response.json();
//   if (response.ok) {
//     dispatch(createADrink(data));
//   }
//   return data;
// };

// export const updateADrink = (drink) => async dispatch => {
//   const response = await fetch(`/api/drinks/${drink.id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(drink)
//   });
//   const data = await response.json();
//   if (response.ok) {
//     dispatch(editADrink(data));
//   }
//   return data
// };

export const deleteExpense = (id) => async (dispatch) => {
  const response = await fetch(`/api/expenses/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const res = await response.json();
    dispatch(deleteAnExpense(id));
    return res;
  }
};

const initialState = {};

const expensesReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case LOAD_EXPENSES:
        action.expenses.forEach((expense) => {
            newState[expense.id] = expense;
        });
        return newState;
    case EXPENSE_BY_ID:
      newState[action.expense.id] = action.expense;
      return newState;
    // case CREATE_A_DRINK:
    //   newState[action.drink.id] = action.drink;
    //   return newState;
    // case UPDATE_A_DRINK:
    //   newState[action.drink.id] = action.drink;
    //   return newState;
    case DELETE_AN_EXPENSE:
      delete newState[action.expenseId];
      return newState;
    default:
      return newState;
  }
};

export default expensesReducer;
