import { RESET_ACTION } from "./expenses";
import { RESET_ACTION_ON_GROUPS } from "./groups";
const USER_FRIENDS = "friends/USER_FRIENDS";
const FRIEND_EXP = "friends/FRIEND_EXP";

const userFriends = (friends) => ({
  type: USER_FRIENDS,
  friends,
});
const friendExpenses = (data) => ({
  type: FRIEND_EXP,
  data
});

export const getUserFriends = () => async (dispatch) => {
  const res = await fetch("/api/users/friends", {
    method: "GET",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(userFriends(data));
    return data;
  }
};

export const requestFriendRequest = (targetEmail) => async (dispatch) => {
    const res = await fetch(`/api/friend/request/${targetEmail}`, {
      method: "POST",
    });

    const data = await res.json();

    if (res.ok) {
      dispatch(getUserFriends());
    }

    return data;
};

export const acceptFriendRequest = (targetId) => async (dispatch) => {
    const res = await fetch(`/api/friend/accept/${targetId}`, {
      method: "PUT",
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(getUserFriends());
      dispatch(loadExpensesByFriendId());
      return data;
    }
  };

export const deleteFriend = (targetId) => async (dispatch) => {
    const res = await fetch(`/api/friend/remove/${targetId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(getUserFriends());
        dispatch(RESET_ACTION());
        dispatch(RESET_ACTION_ON_GROUPS())
        return data;
    }
};

export const loadExpensesByFriendId = (id) => async (dispatch) => {
  const response = await fetch(`/api/friend/${id}`, {
    method: "GET"
  });
  const data = await response.json();
  // console.log("loadExpensesByFriendId " + id, data)
  if (response.ok) {
    // console.log("loadExpensesByFriendId was ok")
    dispatch(friendExpenses(data));
  } else {
    return null
  }

  return data
};



const initialState = {};
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case USER_FRIENDS:
      newState = { ...state, friends: action.friends };
      return newState;
    case FRIEND_EXP:
      newState = { ...state, expenses: action.data };
      return newState;
    default:
      return state;
  }
}
