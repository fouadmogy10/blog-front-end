import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { toast } from "react-toastify";
import base_url from "../../utils/baseURL";
import { useDispatch, useSelector } from "react-redux";
import {
  GoofleSignInFailure,
  GoofleSignInStart,
  GoofleSignInSuccess,
} from "../../app/features/auth/authSlice";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const { Gloading } = useSelector((state) => state.auth);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      dispatch(GoofleSignInStart());
      const res = await base_url.post("/auth/google", {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      });
      const data = await res.data;
      localStorage.setItem("user",JSON.stringify(data) );
      localStorage.setItem("userToken", data?.token);
      if (res.statusText === "OK") {
        dispatch(GoofleSignInSuccess(data));
        toast.success("Login Successfully");
        navigate("/");
      }
    } catch (error) {
      dispatch(GoofleSignInFailure(error));
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md w-full hover:bg-gray-100"
      disabled={Gloading}
    >
      <div className="px-4 py-3">
        <AiOutlineGoogle className="h-6 w-6" color="red" />
      </div>
      <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
        Sign in with Google{" "}
        {Gloading && <span className="loading loading-spinner loading-md"></span>}
      </h1>
    </button>
  );
};

export default GoogleAuth;
