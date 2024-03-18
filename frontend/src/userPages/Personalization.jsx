import React from "react";
//components
import CustomComponents from "../components/CustomComponents";

const Personalization = () => {
  return (
    <div id="personalization">
      <i
        className="fa-solid fa-circle-arrow-left"
        onClick={() => window.history.back()}
      ></i>
      <h1 className="personalizationh1">Personalization</h1>
      <CustomComponents />
    </div>
  );
};

export default Personalization;
