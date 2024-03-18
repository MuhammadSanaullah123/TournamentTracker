import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import UserControls from "./userPages/UserControls";
import MatchPlay from "./userPages/MatchPlay";
import Personalization from "./userPages/Personalization";
import Login from "./admin/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import { Provider } from "react-redux";
//import setAuthToken from "./utils/setAuthToken";
//others
import Cookies from "universal-cookie";
const App = () => {
  const cookies = new Cookies(null, { path: "/" });
  let cookiesColors = cookies.get("colors");
  useEffect(() => {
    if (cookiesColors && cookiesColors.page) {
      document.body.style.backgroundColor = cookiesColors.page;
    }
    //boxHeader
    localStorage.setItem(
      "boxHeaderColor",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--tertiary-color"
      )
    );
    //box
    localStorage.setItem(
      "boxColor",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--tertiary-color"
      )
    );
    //mainHeading
    localStorage.setItem(
      "mainHeadingColor",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--tertiary-color"
      )
    );
    //subHeading
    localStorage.setItem(
      "subHeadingColor",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--primary-color"
      )
    );
    //bodyText
    localStorage.setItem(
      "bodyTextColor",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--primary-color"
      )
    );
  }, []);
  return (
    <>
      <Provider store={store}>
        <Router>
          <ToastContainer />

          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate replace to="/userControls" />}
            />
            <Route exact path="/userControls" element={<UserControls />} />
            <Route exact path="/matchplay/:id" element={<MatchPlay />} />
            <Route
              exact
              path="/personalization"
              element={<Personalization />}
            />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
