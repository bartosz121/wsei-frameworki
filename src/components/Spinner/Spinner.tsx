import React from "react";

const Spinner = () => {
  return (
    <div
      role="status"
      className="mx-auto w-full flex flex-row justify-center overflow-hidden lds-ring"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
