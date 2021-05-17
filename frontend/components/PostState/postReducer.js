import {
  ADD_POST,
  FETCH_POSTS,
  POST_ERROR,
  DELETE_POST,
  UPDATE_POST,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        error: null,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        error: null,
      };
    case FETCH_POSTS:
      return { ...state, posts: action.payload };
    case POST_ERROR:
      return { ...state, error: action.payload };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === action.payload._id ? action.payload : post;
        }),
      };
    default:
      return state;
  }
};
