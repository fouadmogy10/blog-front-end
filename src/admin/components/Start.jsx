import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import Navbar from "./Navbar";
import "./dashboard.css";
const Start = ({ children }) => {
  const [toggle, settoggle] = useState(true);
  const togglec = (toggle) => {
    settoggle(!toggle);
    if (toggle) {
      localStorage.setItem("collapse","hide")
    }else{
      localStorage.setItem("collapse","show")

    }
  };

  useEffect(() => {
    if (localStorage.getItem("mode") == "black") {
      document.body.classList.add("dark");
    }
  }, []);
  return (
    <div className="min-h-screen">
      <SideNav toggle={toggle} />
      <section id="content">
        <Navbar
          toggle={toggle}
          click={togglec}
        />
        {children}
      </section>
    </div>
  );
};

export default Start;
