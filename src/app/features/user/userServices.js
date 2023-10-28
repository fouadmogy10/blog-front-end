import base_url from "../../../utils/baseURL";

const getProfile = async (id) => {
  const response = await base_url.get(`/users/profile/${id}`);
  return response.data;
};
const getAllUsers = async () => {
  const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,

    }
}
  const response = await base_url.get(`/users/profile`,config);
  return response.data;
};
const deleteUser = async (id) => {
  const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,

    }
}
  const response = await base_url.delete(`/users/profile/${id}`,config);
  return response.data;
};
const updateProfile = async ({formData,id}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        }
    }
  const response = await base_url.put(`/users/profile/${id}`,formData,config);
  return response.data;
};
const updateProfilePhoto = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type" :"multipart/form-data"
        }
    }
  const response = await base_url.post(`/users/profile/Photo-upload`,data,config);
  return response.data;
};

const userService = {
  getProfile,updateProfilePhoto,getAllUsers,deleteUser,updateProfile
};

export default userService;
