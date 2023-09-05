import { loadAllUserExpenses } from "./expenses";

export const settleBalance = (settlement) => async (dispatch) => {
    const response = await fetch(`/api/balances/${settlement.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settlement)
    });
    const data = await response.json();
    if (response.ok) {
        dispatch(loadAllUserExpenses());
    }
    return data;
  };
