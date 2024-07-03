import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firbase/config";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import "./signin.css";
import Modal from "../shared/Modal";
import ReactLoading from "react-loading";

const Signin = () => {
  const [showLoading, setshowLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showSendEmail, setshowSendEmail] = useState(false);
  const [resetPass, setresetPass] = useState("");
  const navigate = useNavigate();

  const [showModal, setshowModal] = useState(false);
  const forgotPassword = () => {
    setshowModal(true);
  };


  const closeModal = () => {
    setshowModal(false)
  }

  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>
      <Header />

      <main>
        {showModal && (
          <Modal closeModal={closeModal}>
            <input
              onChange={(eo) => {
                setresetPass(eo.target.value);
              }}
              required
              placeholder=" E-mail : "
              type="email"
            />
            <button
              onClick={(eo) => {
                eo.preventDefault();

                sendPasswordResetEmail(auth, resetPass)
                  .then(() => {
                    console.log("send email");
                    setshowSendEmail(true);
                  })
                  .catch((error) => {
                    // ..
                  });
              }}
            >
              Reset Password
            </button>
            {showSendEmail && (
              <p className="check-email">
                Please check your email to reset your password.
              </p>
            )}
          </Modal>
        )}


        <form>
          <input
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            required
            placeholder=" E-mail : "
            type="email"
          />

          <input
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            required
            placeholder=" Password : "
            type="password"
          />

          <button
            onClick={async(eo) => {
              eo.preventDefault();
              setshowLoading(true);
              await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  setSuccess("Your Account has been signed successfully");
                  navigate("/");
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;

                  switch (errorCode) {
                    case "auth/invalid-email":
                      setError("Wrong Email");
                      break;

                    case "auth/user-not-found":
                      setError("Wrong Email");
                      break;

                    case "auth/wrong-password":
                      setError("Wrong Password");
                      break;

                    case "auth/too-many-requests":
                      setError("Too many requests, please try aganin later");
                      break;

                    default:
                      setError("Please check your email & password");
                      break;
                  }
                });
                setshowLoading(false);
            }}
          >
             {showLoading ? (
              <div style={{ justifyContent: "center" }} className="flex">
                <ReactLoading
                  type={"spin"}
                  color={"white"}
                  height={20}
                  width={20}
                />
              </div>
            ) : (
              "Sign in"
            )}
          </button>
          <p className="account">
            Don't hava an account <Link to="/signup"> Sign-up</Link>
          </p>

          <p
            onClick={() => {
              forgotPassword();
            }}
            className="forgot-pass"
          >
            Forgot password ?
          </p>

          <p style={{ color: "#000", fontSize: "16px" }}>{success}</p>
          <p style={{ color: "#000", fontSize: "16px" }}>{error}</p>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signin;
