import React from "react";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="mx-auto w-full flex flex-row justify-center overflow-hidden lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
