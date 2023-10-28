import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import Home from "../pages/Home";
import { toast } from "react-toastify";

function PrivateRoutesAdmin() {
  const Navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [LoggedIn, setLoggedIn] = useState(false);
  const [checkStatus, setcheckStatus] = useState(true);

  useEffect(() => {
    if (user.isAdmin) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setcheckStatus(false);
  }, [user]);

  if (checkStatus) {
    return <Spinner />;
  }
  if (LoggedIn) {
    return <Outlet />;
  } else {
    Navigate("/");
    window.location.reload();
  }
}

export default PrivateRoutesAdmin;
