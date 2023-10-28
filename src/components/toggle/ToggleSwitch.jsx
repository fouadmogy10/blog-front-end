import React, { useState } from "react";
import "./style.css";
const ToggleSwitch = () => {
  const [theme, settheme] = useState(window.localStorage.getItem("mode"));
const changeTheme=(e) =>{
  if (e.target.checked == true) {
    // document.body.classList.add("dark");
    document.body.setAttribute('data-theme', "black")
    localStorage.setItem("mode", "black");
  } else {
    // document.body.classList.remove("dark");
    document.body.setAttribute('data-theme', "light")
    // document.body.classList.add("light");
    localStorage.setItem("mode", "light");
  }
}
  return (
    <label className="ui-switch">
      <input
        type="checkbox"
        onChange={changeTheme}
        defaultChecked={localStorage.getItem("mode") == "black" ? true : false}
      />
      <div className="slider" onClick={() => settheme(!theme)}>
        <div className="circle"></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
