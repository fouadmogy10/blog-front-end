import base_url from "../../../utils/baseURL";
const getAllPost = async () => {
  const response = await base_url.get(`/posts`);
  return response.data;
};
const getPost = async (id) => {
  const response = await base_url.get(`/posts/${id}`);
  return response.data;
};
const CreatPost = async (data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await base_url.post(`/posts`, data, config);
  return response.data;
};
const updatePost = async ({ id, title, description, category }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };
  const response = await base_url.put(
    `/posts/${id}`,
    { title, description, category },
    config
  );
  return response.data;
};
const updatePostIMG = async (data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await base_url.put(
    `/posts/update-image/${data.id}`,
    data.data,
    config
  );
  return response.data;
};
const deletePost = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };
  const response = await base_url.delete(`/posts/${id}`, config);
  return response.data;
};
const LikePost = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };
  const response = await base_url.put(`/posts/likes/${id}`, "", config);
  return response.data;
};
const CreateComment = async ({ postId, text }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };
  const response = await base_url.post(`/comment`, { postId, text }, config);
  return response.data;
};

const BlogService = {
  getAllPost,
  getPost,
  CreatPost,
  updatePostIMG,
  updatePost,
  deletePost,
  LikePost,
  CreateComment,
};

export default BlogService;
