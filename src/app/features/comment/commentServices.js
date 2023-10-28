import base_url from "../../../utils/baseURL";

const CreateComment = async ({ postId, text }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };
  const response = await base_url.post(`/comment`, { postId, text }, config);

  return response.data;
};

const commentService = {
  CreateComment,
};

export default commentService;
