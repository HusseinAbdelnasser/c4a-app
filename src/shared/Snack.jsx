import React from "react";
import { Helmet } from "react-helmet-async";

const Snack = ({ showMessage, message }) => {
  return (
    <div>
      <Helmet>
        <style type="text/css">{`
            
            .home .show-message {
              background-color: whitesmoke;
              font-size: 18px;
              color: #1b1b1b;
              padding: 8px 12px;
              font-weight: normal;
              border-radius: 5px;
              position: fixed;
              top: 100px;
              transition: 1s;
            }

            .Light .home .show-message{
              background-color: #333;
              color: white;
            }
            .home .fa-circle-check {
              color: rgb(30, 200, 200);
              margin-left: 5px;
            }
            
            `}</style>
      </Helmet>

      <p
        style={{
          right: showMessage ? "20px" : "-100vw",
        }}
        className="show-message"
      >
        {message} <i className="fa-regular fa-circle-check"></i>
      </p>
    </div>
  );
};

export default Snack;
