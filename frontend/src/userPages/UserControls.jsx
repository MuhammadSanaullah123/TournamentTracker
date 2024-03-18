import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//others
import { toast } from "react-toastify";

const UserControls = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    type: "",
    screens: "",
    options: "",
    tour_id: "",
  });

  const handleInput = (e) => {
    const Value = e.target.value;

    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: Value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.tour_id) {
      navigate(`/matchplay/${values.tour_id}`);
    } else {
      toast.error("Enter Tournament ID!", {
        autoClose: 2000,
      });
    }
  };

  console.log(values);
  return (
    <div id="userControls">
      <i
        className="fa-solid fa-gear"
        onClick={() => navigate("/personalization")}
      ></i>
      <div className="parentDiv">
        <h1>Tournament</h1>
        <form onSubmit={handleSubmit} className="form">
          <select
            name="type"
            id="type"
            className="dropdown"
            value={values.type}
            onChange={handleInput}
          >
            <option value="" disabled selected hidden>
              Tournament Type
            </option>
            <option value="Max Matchplay">Max Matchplay</option>
          </select>
          <select
            name="screens"
            id="screens"
            className="dropdown dropdownMargin"
            value={values.screens}
            onChange={handleInput}
          >
            <option value="" disabled selected hidden>
              Number of screens
            </option>
            <option value="1">1</option>
          </select>
          <select
            name="options"
            id="options"
            className="dropdown dropdownMargin"
            value={values.options}
            onChange={handleInput}
          >
            <option value="" disabled selected hidden>
              Options
            </option>
            <option value="Live Matches">Live Matches</option>
            <option value="Live Matches and Standings">
              Live Matches and Standings
            </option>
            <option value="Live Matches, Waitlist, and Standings">
              Live Matches, Waitlist, and Standings
            </option>
          </select>
          <input
            type="text"
            name="tour_id"
            id="id"
            onChange={handleInput}
            value={values.tour_id}
            className="tourInput"
            placeholder="Tournament ID"
          />

          <button className="Submitbtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserControls;
