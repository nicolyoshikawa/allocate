import { RESET_ACTION } from "./expenses";
const USER_FRIENDS = "friends/USER_FRIENDS";

const userFriends = (friends) => ({
  type: USER_FRIENDS,
  friends,
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
        return data;
    }
};

const initialState = {};
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case USER_FRIENDS:
      newState = { ...state, friends: action.friends };
      return newState;
    default:
      return state;
  }
}
