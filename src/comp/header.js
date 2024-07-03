import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firbase/config";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  return (
    <div className="myheader">
      <header className="hide-when-mobile ali">
        <h1>
          <Link to="/">Dev</Link>
        </h1>

        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>

        <ul className="flex">
          <li className="main-list lang">
            <p> {t("lang")}</p>

            <ul className="lang-box">
              <li
               onClick={() => {
                i18n.changeLanguage("ar");
              }}
              dir="rtl">
                <p> العربية</p>
                {i18n.language === "ar" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>

              <li
                 onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                <p>English</p>

                {i18n.language === "en" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
              <li
                onClick={() => {
                  i18n.changeLanguage("fr");
                }}
              >
                <p>French</p>

                {i18n.language === "fr" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
            </ul>
          </li>

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                Sign-in
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link " to="/signup">
                Sign-up
              </NavLink>
            </li>
          )}

          {user && (
            <li
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("Sign-out successful.");
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
              className="main-list"
            >
              <NavLink className=" signout"> {  t("signout")  }</NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/html">
              {t("support")}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
              {t("account")}
              </NavLink>
            </li>
          )}
        </ul>
      </header>

      <header className="show-when-mobile ali">
        <h1>Dev</h1>
        <label className="absolute" htmlFor="burger">
          <i className="fas fa-bars" />
        </label>
        <div className="show-on-click">
          <div className="main-div">
            <label>
              HTML 
            </label>
          </div>
          <div className="main-div">
            <label>
              Profile 
            </label>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
