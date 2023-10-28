import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateProfilePhoto,
} from "../../app/features/user/userSlice";

const ProfileImgModel = () => {
  const [image, setimage] = useState(null);
  const [File, setFile] = useState(null);
  const dispatch = useDispatch();
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="mb-8">
            <input
              type="file"
              hidden
              id="files"
              onChange={(e) => {
                setimage(e.target?.files[0]?.name);
                setFile(e.target?.files[0]);
              }}
            />
            <label
              htmlFor="files"
              className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
            >
              <div>
                <span className="mb-2 block text-xl font-semibold ">
                  Drop files here
                </span>
                <span className="mb-2 block text-base font-medium ">Or</span>
                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium ">
                  Browse
                </span>
              </div>
            </label>
          </div>

          {image && (
            <div className="mb-5 rounded-md  py-4 px-8">
              <div className="flex items-center justify-between">
                <span className="truncate pr-3 text-base font-medium ">
                  {image}
                </span>
                <button className="" onClick={() => setimage(null)}>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="modal-action ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button
                className="btn rounded-lg"
                onClick={async () => {
                  if (File) {
                    const formData = new FormData();
                    formData.append("image", File);
                    await dispatch(updateProfilePhoto(formData));
                  }
                }}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProfileImgModel;
