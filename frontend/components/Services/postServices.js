import axios from "axios";
const BASE_URL = "http://192.168.56.1:5000";
const addPost = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await axios.post(`${BASE_URL}/api/posts`, formData, config);
  return res;
};
const deletePost = async (id) => {
  await axios.delete(`${BASE_URL}/api/posts/${id}`);
};
const fetchPosts = async () => {
  const res = await axios.get(`${BASE_URL}/api/posts`);
  return res;
};
const updatePost = async (id,formdata) => {
  const res = await axios.put(`${BASE_URL}/api/posts/${id}`,formdata);
  return res;
};
export default { addPost, fetchPosts, deletePost,updatePost };
