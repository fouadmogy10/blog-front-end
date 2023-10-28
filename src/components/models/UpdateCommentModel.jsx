import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateComment } from "../../app/features/comment/commentSlice";

// const UpdateCommentModel = ({ text:comment ,id}) => {
const UpdateCommentModel = ({ setUpdateComment, commentForUpdate }) => {
  const dispatch = useDispatch();
  const [formData, setformData] = useState({
    text: commentForUpdate?.text,

  });
  const { text } = formData;
  const onchange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>

      <dialog id="my_modal_45" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">

          <div className="mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Comment
            </label>
            <textarea
              name="text"
              rows="5"
              className="appearance-none block w-full text-base font-medium border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
              value={text}
              onChange={onchange}
            ></textarea>
          </div>

          <div className="modal-action ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={()=>{
                setUpdateComment(false);
              }}
              >
                ✕
              </button>
              <button
                className="btn rounded-lg"
                onClick={ async() => {
                  await dispatch(updateComment({ text,id: commentForUpdate?._id }));
                  setUpdateComment(false);
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

export default UpdateCommentModel;
