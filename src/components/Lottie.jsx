import React from "react";

const Lottie = (url) => {
  return (
    <div className="min-h-[70vh] flex justify-center items-center" key={"fdfh8589"}>
      <lottie-player
        autoplay
        loop
        mode="normal"
        src={`${url.url}`}
        style={{ width: " 320px" }}
      ></lottie-player>
    </div>
  );
};

export default Lottie;
