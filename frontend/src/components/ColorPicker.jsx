import React, { useState, useEffect } from "react";
//others
import { SketchPicker } from "react-color";
import Cookies from "universal-cookie";
const ColorPicker = ({ target, open, colors, setColors }) => {
  const cookies = new Cookies(null, { path: "/" });
  let cookiesColors = cookies.get("colors");
  const [color, setColor] = useState();
  const pickerStyle = {
    default: {
      picker: {
        borderRadius: "4px 4px 0px 0px",
      },
    },
  };
  useEffect(() => {
    let currentColor;

    switch (target) {
      case "page":
        currentColor = getComputedStyle(document.body).backgroundColor;
        break;
      case "boxHeader":
        /*     const boxHeaderDiv = document.getElementById("boxHeader");
        const computedStyle = getComputedStyle(boxHeaderDiv);

        currentColor = computedStyle.backgroundColor; */
        if (cookiesColors && cookiesColors.boxHeader) {
          currentColor = cookiesColors.boxHeader;
        } else {
          currentColor = localStorage.getItem("boxHeaderColor");
        }

        break;
      case "box":
        /*      const boxDiv = document.getElementById("box");
        const boxcomputedStyle = getComputedStyle(boxDiv);

        currentColor = boxcomputedStyle.backgroundColor; */
        if (cookiesColors && cookiesColors.box) {
          currentColor = cookiesColors.box;
        } else {
          currentColor = localStorage.getItem("boxColor");
        }

        break;
      case "mainHeading":
        /*   const mainHeading = document.querySelectorAll("#matchplay h2");
        const mainHeadingcomputedStyle = getComputedStyle(mainHeading[0]);

        currentColor = mainHeadingcomputedStyle.color; */
        if (cookiesColors && cookiesColors.mainHeading) {
          currentColor = cookiesColors.mainHeading;
        } else {
          currentColor = localStorage.getItem("mainHeadingColor");
        }

        break;
      case "subHeading":
        /*    const subHeading = document.querySelectorAll("#boxHeader p");
        const subHeadingcomputedStyle = getComputedStyle(subHeading[0]);

        currentColor = subHeadingcomputedStyle.color; */
        if (cookiesColors && cookiesColors.subHeading) {
          currentColor = cookiesColors.subHeading;
        } else {
          currentColor = localStorage.getItem("subHeadingColor");
        }
        break;
      case "bodyText":
        /*  const bodyText = document.querySelectorAll("#box .matchplayDiv1p2");
        const bodyTextcomputedStyle = getComputedStyle(bodyText[0]);

        currentColor = bodyTextcomputedStyle.color; */
        if (cookiesColors && cookiesColors.bodyText) {
          currentColor = cookiesColors.bodyText;
        } else {
          currentColor = localStorage.getItem("bodyTextColor");
        }
        break;
      default:
        break;
    }
    setColor(currentColor);
  }, [target]);
  useEffect(() => {
    switch (target) {
      case "page":
        setColors({ ...colors, page: color });
        break;
      case "boxHeader":
        setColors({ ...colors, boxHeader: color });
        break;
      case "box":
        setColors({ ...colors, box: color });
        break;
      case "mainHeading":
        setColors({ ...colors, mainHeading: color });
        break;
      case "subHeading":
        setColors({ ...colors, subHeading: color });
        break;
      case "bodyText":
        setColors({ ...colors, bodyText: color });
        break;
    }
  }, [color]);

  return (
    <div id="colorPicker">
      {open && (
        <>
          {/* <i className="fa-solid fa-xmark colorPickerCrossImg"></i> */}
          <SketchPicker
            styles={pickerStyle}
            color={color}
            onChange={(updatedColor) => setColor(updatedColor.hex)}
          />
        </>
      )}
    </div>
  );
};

export default ColorPicker;
