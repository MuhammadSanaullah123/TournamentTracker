import React, { useState, useEffect } from "react";
//components
import ColorPicker from "./ColorPicker";
//others
import Cookies from "universal-cookie";
const CustomComponents = () => {
  const cookies = new Cookies(null, { path: "/" });

  let cookiesColors = cookies.get("colors");
  let cookiesFontSize = cookies.get("fontSize");

  const [target, setTarget] = useState("");
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState({
    page:
      cookiesColors && cookiesColors.page
        ? cookiesColors.page
        : getComputedStyle(document.documentElement).getPropertyValue(
            "--primary-color"
          ),
    boxHeader:
      cookiesColors && cookiesColors.boxHeader
        ? cookiesColors.boxHeader
        : getComputedStyle(document.documentElement).getPropertyValue(
            "--tertiary-color"
          ),
    box:
      cookiesColors && cookiesColors.box
        ? cookiesColors.box
        : getComputedStyle(document.documentElement).getPropertyValue(
            "--tertiary-color"
          ),
    mainHeading:
      cookiesColors && cookiesColors.mainHeading
        ? cookiesColors.mainHeading
        : getComputedStyle(document.documentElement).getPropertyValue(
            "--tertiary-color"
          ),
    subHeading:
      cookiesColors && cookiesColors.subHeading
        ? cookiesColors.subHeading
        : getComputedStyle(document.documentElement).getPropertyValue(
            "--primary-color"
          ),
    bodyText:
      cookiesColors && cookiesColors.bodyText
        ? cookiesColors.bodyText
        : getComputedStyle(document.documentElement).getPropertyValue(
            "--primary-color"
          ),
  });
  const [fontSize, setFontSize] = useState({
    mainHeading: "",
    subHeading: "",
    bodyText: "",
  });
  const [values, setValues] = useState({
    mainHeading: null,
    subHeading: null,
    bodyText: null,
  });
  const handleInput = (e) => {
    const Value = e.target.value;
    setFontSize({ ...fontSize, [e.target.name]: Value });
  };
  const handleSave = () => {
    cookies.set("colors", JSON.stringify(colors));
    cookies.set("fontSize", JSON.stringify(fontSize));

    window.location.reload();
  };
  const handleReset = () => {
    cookies.remove("colors");
    window.location.reload();
  };
  const handleResetSize = () => {
    cookies.remove("fontSize");
    window.location.reload();
  };
  useEffect(() => {
    const mainHeadingElement = document.querySelector("#matchplay h2");
    const subHeadingElement = document.querySelector("#boxHeader p");
    const bodyTextElement = document.querySelector("#box .matchplayDiv1p2");

    if (mainHeadingElement && subHeadingElement && bodyTextElement) {
      const mainHeadingFontSize = mainHeadingElement.style.fontSize;
      const subHeadingFontSize = subHeadingElement.style.fontSize;
      const bodyTextFontSize = bodyTextElement.style.fontSize;

      setFontSize((prevState) => ({
        ...prevState,
        mainHeading:
          cookiesFontSize && cookiesFontSize.mainHeading
            ? cookiesFontSize.mainHeading
            : mainHeadingFontSize,
        subHeading:
          cookiesFontSize && cookiesFontSize.subHeading
            ? cookiesFontSize.subHeading
            : subHeadingFontSize,
        bodyText:
          cookiesFontSize && cookiesFontSize.bodyText
            ? cookiesFontSize.bodyText
            : bodyTextFontSize,
      }));
    }
  }, []);

  return (
    <div id="customComponents">
      <div className="customComponentsCategoriesDiv">
        <div className="separateSections">
          <h1>Custom Colors Background</h1>
          <div className="customComponentsDiv1">
            <p>Page</p>
            <span
              onClick={() => {
                setTarget("page");
                setOpen(!open);
              }}
              style={{
                /*      background: getComputedStyle(document.body).backgroundColor, */
                backgroundColor: colors.page,
              }}
            ></span>
          </div>
          <div className="customComponentsDiv1">
            <p>Box Header</p>
            <span
              onClick={() => {
                setTarget("boxHeader");
                setOpen(!open);
              }}
              style={{
                /*      background: getComputedStyle(document.body).backgroundColor, */
                backgroundColor: colors.boxHeader,
              }}
            ></span>
          </div>
          <div className="customComponentsDiv1">
            <p>Box</p>
            <span
              onClick={() => {
                setTarget("box");
                setOpen(!open);
              }}
              style={{
                backgroundColor: colors.box,
              }}
            ></span>
          </div>
        </div>
        <div className="separateSections">
          <h1>Custom Font Colors</h1>
          <div className="customComponentsDiv1">
            <p>Main Heading</p>
            <span
              onClick={() => {
                setTarget("mainHeading");
                setOpen(!open);
              }}
              style={{
                /*      background: getComputedStyle(document.body).backgroundColor, */
                backgroundColor: colors.mainHeading,
              }}
            ></span>
          </div>
          <div className="customComponentsDiv1">
            <p>Sub Heading</p>
            <span
              onClick={() => {
                setTarget("subHeading");
                setOpen(!open);
              }}
              style={{
                /*      background: getComputedStyle(document.body).backgroundColor, */
                backgroundColor: colors.subHeading,
              }}
            ></span>
          </div>
          <div className="customComponentsDiv1">
            <p>Body Text</p>
            <span
              onClick={() => {
                setTarget("bodyText");
                setOpen(!open);
              }}
              style={{
                /*      background: getComputedStyle(document.body).backgroundColor, */
                backgroundColor: colors.bodyText,
              }}
            ></span>
          </div>
        </div>
        <div className="separateSections">
          <h1>Custom Font Size</h1>
          <div className="customComponentsDiv1">
            <p>Main Heading</p>
            <input
              type="number"
              name="mainHeading"
              id="mainHeading"
              value={fontSize.mainHeading}
              onChange={handleInput}
              className="numberInput"
            />
          </div>
          <div className="customComponentsDiv1">
            <p>Sub Heading</p>
            <input
              type="number"
              name="subHeading"
              id="subHeading"
              value={fontSize.subHeading}
              onChange={handleInput}
              className="numberInput"
            />
          </div>
          <div className="customComponentsDiv1">
            <p>Body Text</p>
            <input
              type="number"
              name="bodyText"
              id="bodyText"
              value={fontSize.bodyText}
              onChange={handleInput}
              className="numberInput"
            />
          </div>
        </div>
      </div>

      <ColorPicker
        target={target}
        open={open}
        setColors={setColors}
        colors={colors}
      />
      <div className="customComponentsBtnDiv">
        <button className="resetBtn" onClick={handleReset}>
          Reset Colors
        </button>
        <button className="resetBtn" onClick={handleResetSize}>
          Reset Size
        </button>

        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default CustomComponents;
