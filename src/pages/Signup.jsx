import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firbase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import Erroe404 from "./Error404";
import ReactLoading from "react-loading";

const Signup = () => {
  const [showLoading, setshowLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setuserName] = useState("");
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  // Loading    (done)
  // NOT sign-in  (done)
  // sign-in without Email verification   (done)
  // (sign-in && verified email) => navigate(/)


  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Erroe404 />
  }


  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Header />

          <main>
            <p>We send you an email to verify your Account</p>
            <button className="delete">Send again</button>
          </main>
          <Footer />
        </div>
      );
    }
  }


  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <Header />

        <main>
          <form>
            <p style={{ fontSize: "23px", marginBottom: "22px" }}>
              Create a new account <span> </span>💛
            </p>
            <input
              onChange={(eo) => {
                setuserName(eo.target.value);
              }}
              required
              placeholder=" UserName : "
              type="text"
            />
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
              onClick={async (eo) => {
                eo.preventDefault();
                setshowLoading(true);
                await createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    sendEmailVerification(auth.currentUser).then(() => {
                      //
                      console.log("Email verification sent!");
                    });
                    updateProfile(auth.currentUser, {
                      displayName: userName,
                    })
                      .then(() => {
                        setSuccess("Your Account has been created successfully")
                        navigate("/signin");
                      })
                      .catch((error) => {
                        console.log(error.code);
                        // ...
                      });
                    // ...
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    switch (errorCode) {

                      case "auth/invalid-email":
                        setErr("Wrong Email")
                        break;


                      case "auth/user-not-found":
                        setErr("Wrong Email")
                        break;


                      case "auth/wrong-password":
                        setErr("Wrong Password")
                        break;


                      case "auth/too-many-requests":
                        setErr("Too many requests, please try aganin later")
                        break;


                      default:
                        setErr("Please check your email & password")
                        break;

                    }
                    // ..
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
                "Sign up"
              )}
            </button>
            <p className="account">
              Already hava an account <Link to="/signin"> Sign-in</Link>
            </p>
            {success}
            {err}
          </form>
        </main>
        <Footer />
      </>
    );
  }

};

export default Signup;
