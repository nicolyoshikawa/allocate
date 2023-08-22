const LOAD_EXPENSES = "expenses/LOAD_EXPENSES";
// const DRINK_BY_ID = "drinks/DRINK_BY_ID";
// const CREATE_A_DRINK = "drinks/CREATE_A_DRINK";
// const UPDATE_A_DRINK = "drinks/UPDATE_A_DRINK";
// const DELETE_A_DRINK = "drinks/DELETE_A_DRINK";

export const loadExpenses = (expenses) => ({
    type: LOAD_EXPENSES,
    expenses
});

// export const drinkById = (drink) => ({
//   type: DRINK_BY_ID,
//   drink
// });

// export const createADrink = (drink) => ({
//   type: CREATE_A_DRINK,
//   drink
// });

// export const editADrink = (drink) => ({
//   type: UPDATE_A_DRINK,
//   drink,
// });

// export const deleteADrink = (drinkId) => ({
//   type: DELETE_A_DRINK,
//   drinkId
// });

export const loadAllUserExpenses = () => async (dispatch) => {
  const response = await fetch("/api/expenses/", {
    method: "GET"
  });
  const data = await response.json();
  dispatch(loadExpenses(data.expenses));
  return response;
};

// export const loadDrinkById = (id) => async (dispatch) => {
//   const response = await fetch(`/api/drinks/${id}`, {
//     method: "GET"
//   });

//   if (response.ok) {
//     const res = await response.json();
//     dispatch(drinkById(res));
//     return res;
//   }
// };

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

// export const deleteDrink = (drinkId) => async (dispatch) => {
//   const response = await fetch(`/api/drinks/${drinkId}`, {
//     method: 'DELETE'
//   });

//   if (response.ok) {
//     const res = await response.json();
//     dispatch(deleteADrink(drinkId));
//     return res;
//   }
// };

const initialState = {};

const expensesReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case LOAD_EXPENSES:
        action.expenses.forEach((expense) => {
            newState[expense.id] = expense;
        });
        return newState;
    // case DRINK_BY_ID:
    //   newState[action.drink.id] = action.drink;
    //   return newState;
    // case CREATE_A_DRINK:
    //   newState[action.drink.id] = action.drink;
    //   return newState;
    // case UPDATE_A_DRINK:
    //   newState[action.drink.id] = action.drink;
    //   return newState;
    // case DELETE_A_DRINK:
    //   delete newState[action.drinkId];
    //   return newState;
    default:
      return newState;
  }
};

export default expensesReducer;
