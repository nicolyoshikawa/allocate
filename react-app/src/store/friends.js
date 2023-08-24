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

export const requestFriendRequest = (targetId) => async (dispatch) => {
    const res = await fetch(`/api/friend/request/${targetId}`, {
      method: "POST",
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(getUserFriends());
      return data;
    }
};

export const acceptFriendRequest = (targetId) => async (dispatch) => {
    const res = await fetch(`/api/friend/accept/${targetId}`, {
      method: "PUT",
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(getUserFriends());
    //   dispatch(getUserPendings());
      return data;
    }
  };

// export const rejectFriendRequest = (targetId) => async (dispatch) => {
//     const res = await fetch(`/api/friend/reject/${targetId}`, {
//         method: "DELETE",
//     });

//     if (res.ok) {
//         const data = await res.json();
//         dispatch(getUserPendings());
//         return data;
//     }
// };

export const deleteFriend = (targetId) => async (dispatch) => {
    const res = await fetch(`/api/friend/remove/${targetId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(getUserFriends());
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
    // case USER_PENDINGS:
    //   newState = { ...state, pendings: action.pendings };
    //   return newState;
    // case USER_REVIEWS:
    //   newState = { ...state, reviews: action.reviews };
    //   return newState;
    default:
      return state;
  }
}
