import { RESET_ACTION } from "./expenses";
const RESET_GROUPS = "expenses/RESET_GROUPS";
const LOAD_GROUPS = "groups/LOAD_GROUPS";
const CREATE_GROUP = "groups/CREATE_GROUP";

export const RESET_ACTION_ON_GROUPS = () => ({
  type: RESET_GROUPS
});
export const load_group = (groups) => ({
  type: LOAD_GROUPS,
  groups
});

export const create_a_group = (group) => ({
  type: CREATE_GROUP,
  group
});

export const getGroups = () => async (dispatch) => {
  const res = await fetch("/api/groups/", {
    method: "GET",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(load_group(data.groups));
    return data;
  }

};
export const createNewGroup = (group) => async (dispatch) => {
  const response = await fetch(`/api/groups/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(group)
  });

  const newGroup = await response.json();
  if (response.ok) {
    dispatch(create_a_group(newGroup));
  }
  return newGroup;
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
    case CREATE_GROUP:
      newState[action.group.id] = action.group;
      return newState;
    case RESET_GROUPS:
      return initialState;
    default:
      return newState;
  }
}
