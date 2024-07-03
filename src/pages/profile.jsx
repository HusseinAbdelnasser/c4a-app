import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";
import "../comp/MainContent.css";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firbase/config";
import Moment from "react-moment";
import { deleteUser } from "firebase/auth";
import Erroe404 from "./Error404";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  });

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Erroe404 />
  }

  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile</title>

          <style type="text/css">{` 
          main{
            flex-direction: column;
          }
  
          .delete{
            margin-top: 25px;
          background-color:  #dc3545;
          padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      border-color: #dc3545;
          }
          
          `}</style>
        </Helmet>
        <Header />

        <main>
          <h6>Email: {user.email}</h6>
          <h6>UserName: {user.displayName}</h6>

          <h6>
            Last Sign-in :{" "}
            <Moment fromNow date={user.metadata.lastSignInTime} />{" "}
          </h6>

          <h6>
            Account Created :{" "}
            <Moment fromNow date={user.metadata.creationTime} />
          </h6>
          <button onClick={() => {
            deleteUser(user).then(() => {
              // 
              console.log("User deleted.")
            }).catch((error) => {
              // An error ocurred
              console.log(error.message)
            });
          }} className="delete">Delete account</button>
        </main>
        <Footer />
      </>
    );
  }
};

export default Profile;
