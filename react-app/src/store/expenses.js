import {loadTotalBalance } from "./balance.js";

const RESET_EXPENSES = "expenses/RESET_EXPENSES";
const LOAD_EXPENSES = "expenses/LOAD_EXPENSES";
const EXPENSE_BY_ID = "expenses/EXPENSE_BY_ID";
const CREATE_AN_EXPENSE = "expenses/CREATE_AN_EXPENSE";
const UPDATE_AN_EXPENSE = "expenses/UPDATE_AN_EXPENSE";
const DELETE_AN_EXPENSE = "expenses/DELETE_AN_EXPENSE";
// const TOTAL_BALANCE = "expenses/TOTAL_BALANCE";

export const RESET_ACTION = () => ({
  type: RESET_EXPENSES
})

export const loadExpenses = (expenses) => ({
    type: LOAD_EXPENSES,
    expenses
});

export const expenseById = (expense) => ({
  type: EXPENSE_BY_ID,
  expense
});

export const createAnExpense = (expense) => ({
  type: CREATE_AN_EXPENSE,
  expense
});

export const editAnExpense = (expense) => ({
  type: UPDATE_AN_EXPENSE,
  expense,
});

export const deleteAnExpense = (expenseId) => ({
  type: DELETE_AN_EXPENSE,
  expenseId
});
// export const loadTotalBalance = (balance) => ({
//   type: TOTAL_BALANCE,
//   balance
// });

export const loadAllUserExpenses = () => async (dispatch) => {
  const response = await fetch("/api/expenses/", {
    method: "GET"
  });
  const data = await response.json();
  dispatch(loadExpenses(data.expenses));
  dispatch(loadTotalBalance(data.balance));
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

export const createANewExpense = (expense) => async (dispatch) => {
  const response = await fetch('/api/expenses/', {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json'},
    body: expense
  });

  const data = await response.json();
  if (response.ok) {
    dispatch(createAnExpense(data));
  }
  return data;
};

export const updateAnExpense = (expense, id) => async dispatch => {
  const response = await fetch(`/api/expenses/${id}`, {
    method: 'PUT',
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(expense)
    body: expense
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(editAnExpense(data));
  }
  return data
};

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
      let load_new_expenses = {};
        action.expenses?.forEach((expense) => {
          load_new_expenses[expense.id] = expense;
        });
        return load_new_expenses;
    case EXPENSE_BY_ID:
      newState[action.expense.id] = action.expense;
      return newState;
    case CREATE_AN_EXPENSE:
      newState[action.expense.id] = action.expense;
      return newState;
    case UPDATE_AN_EXPENSE:
      newState[action.expense.id] = action.expense;
      return newState;
    case DELETE_AN_EXPENSE:
      delete newState[action.expenseId];
      return newState;
    case RESET_EXPENSES:
      return initialState;
    default:
      return newState;
  }
};

export default expensesReducer;
