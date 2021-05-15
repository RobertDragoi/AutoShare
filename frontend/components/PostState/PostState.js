import React, { useReducer, useContext, useEffect } from "react";
import PostContext from "./postContext";
import UserContext from "../UserState/userContext";
import PostReducer from "./postReducer";
import postServices from "../Services/postServices";
import { ADD_POST, FETCH_POSTS, POST_ERROR, DELETE_POST } from "../types";
const PostState = (props) => {
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await postServices.fetchPosts();
      dispatch({ type: FETCH_POSTS, payload: res.data.reverse() });
    };
    console.log("fetching");
    fetchPosts();
  }, []);
  const initialState = {
    posts: null,
    error: null,
  };
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [state, dispatch] = useReducer(PostReducer, initialState);
  const addPost = async (formData) => {
    try {
      console.log({ ...formData, user: user?._id });
      const res = await postServices.addPost({ ...formData, user: user?._id });
      dispatch({ type: ADD_POST, payload: res.data });
      console.log("add post");
    } catch (error) {
      dispatch({ type: POST_ERROR, payload: error.message });
    }
  };
  const deletePost = async (id) => {
    try {
      await postServices.deletePost(id);
      console.log("delete");
      dispatch({ type: DELETE_POST, payload: id });
    } catch (error) {
      dispatch({ type: POST_ERROR, payload: error.message });
    }
  };
  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        error: state.error,
        addPost,
        deletePost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
