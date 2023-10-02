import { RESET_ACTION } from "./expenses";
const LOAD_GROUPS = "groups/LOAD_GROUPS";

const group = (groups) => ({
  type: LOAD_GROUPS,
  groups,
});

export const getGroups = () => async (dispatch) => {
  const res = await fetch("/api/groups/", {
    method: "GET",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(group(data.groups));
    return data;
  }

};

const initialState = {};
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_GROUPS:
        action.groups.forEach((group) => {
            newState[group.id] = group;
        });
        return newState;
    default:
      return state;
  }
}
