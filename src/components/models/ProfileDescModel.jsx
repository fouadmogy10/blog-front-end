import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { updateProfile } from "../../app/features/user/userSlice";

const ProfileDescModel = ({ username: UN, bio: Bio,job:Job }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [password, setpassword] = useState("");
  const [formData, setformData] = useState({
    username: UN ? UN : "",
    bio: Bio ? Bio : "",
    job: Job ? Job : "",
  });

  const { username, bio ,job} = formData;

  const onchange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <dialog id="my_modal_6" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="mb-5">
            <label
              htmlFor="username"
              className="mb-3 block text-base font-medium "
            >
              userName
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              className="w-full rounded-md border b py-3 px-6 text-base font-medium  outline-none  focus:shadow-md"
              value={username}
              onChange={onchange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="job"
              className="mb-3 block text-base font-medium "
            >
              job
            </label>
            <input
              type="text"
              name="job"
              id="job"
              placeholder="job"
              className="w-full rounded-md border b py-3 px-6 text-base font-medium  outline-none  focus:shadow-md"
              value={job}
              onChange={onchange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="bio" className="mb-3 block text-base font-medium ">
              bio
            </label>
            <input
              type="text"
              name="bio"
              id="bio"
              placeholder="bio"
              className="w-full rounded-md border b py-3 px-6 text-base font-medium  outline-none  focus:shadow-md"
              value={bio}
              onChange={onchange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-3 block text-base font-medium "
            >
              password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="password"
              className="w-full rounded-md border b py-3 px-6 text-base font-medium  outline-none  focus:shadow-md"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="modal-action ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button
                className="btn rounded-lg"
                onClick={() => {
                  if (password.trim() !== "") {
                    formData.password = password;
                  }
                  dispatch(updateProfile({ formData, id }));
                }}
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProfileDescModel;
