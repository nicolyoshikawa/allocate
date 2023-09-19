import { loadExpenseById } from "./expenses";
const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
const COMMENT_BY_ID = "comments/COMMENT_BY_ID";
const COMMENTS_BY_EXPENSEID = "expenses/COMMENT_BY_EXPENSEID";
const CREATE_A_COMMENT = "comments/CREATE_A_COMMENT";
const UPDATE_A_COMMENT = "comments/UPDATE_A_COMMENT";
const DELETE_A_COMMENT = "comments/DELETE_A_COMMENT";

export const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments
});

export const commentById = (comment) => ({
  type: COMMENT_BY_ID,
  comment
});

export const commentsByExpenseId = (comments) => ({
  type: COMMENTS_BY_EXPENSEID,
  comments
});

export const createAComment = (comment) => ({
  type: CREATE_A_COMMENT,
  comment
});

export const editAComment = (comment) => ({
  type: UPDATE_A_COMMENT,
  comment,
});

export const deleteAComment = (commentId) => ({
  type: DELETE_A_COMMENT,
  commentId
});

export const loadAllComments = () => async (dispatch) => {
  const response = await fetch("/api/comments", {
    method: "GET"
  });
  const data = await response.json();
  dispatch(loadComments(data.comments));
  return response;
};

export const loadCommentById = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "GET"
  });

  if (response.ok) {
    const res = await response.json();
    dispatch(commentById(res));
    return res;
  }
};

export const loadCommentsByDrinkId = (expense) => async (dispatch) => {
  const response = await fetch(`/api/expenses/${expense.id}/comments`, {
    method: "GET"
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(commentsByExpenseId(data.comments));
    return response;
  }
};

export const createNewComment = (comment, expense) => async (dispatch) => {
  const response = await fetch(`/api/expenses/${expense.id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  });

  const newComment = await response.json();
  if (response.ok) {
    dispatch(createAComment(newComment));
    dispatch(loadExpenseById(expense.id));
  }
  return newComment;
};

export const updateAComment = (comment, expense) => async dispatch => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  });

  const updatedComment = await response.json();
  if (response.ok) {
    dispatch(editAComment(updatedComment));
    dispatch(loadExpenseById(expense.id));
  }
  return updatedComment;
};

export const deleteComment = (commentId, expense) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const res = await response.json();
    dispatch(deleteAComment(commentId));
    dispatch(loadExpenseById(expense.id));
    return res;
  }
};

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case LOAD_COMMENTS:
        action.comments.forEach((comment) => {
            newState[comment.id] = comment;
        });
        return newState;
    case COMMENT_BY_ID:
      newState[action.comment.id] = action.comment;
      return newState;
    case COMMENTS_BY_EXPENSEID:
      let commentsByDrinkId = {};
        action.comments.forEach((comment) => {
            commentsByDrinkId[comment.id] = comment;
        });
        return commentsByDrinkId;
    case CREATE_A_COMMENT:
      newState[action.comment.id] = action.comment;
      return newState;
    case UPDATE_A_COMMENT:
      newState[action.comment.id] = action.comment;
      return newState;
    case DELETE_A_COMMENT:
      delete newState[action.commentId];
      return newState;
    default:
      return newState;
  }
};

export default commentsReducer;
