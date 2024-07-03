import Header from "../comp/header";
import Footer from "../comp/Footer";
import MainContent from "../comp/MainContent";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firbase/config";
import { useEffect } from 'react'
import { Link } from "react-router-dom";
import Loading from "../comp/Loading";
import Erroe404 from "./Error404";
const About = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }

    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  })


    if (loading) {
      return <Loading />
    }

    if(error){
      return <Erroe404 />
    }


    if (user) {
      if (user.emailVerified) {
        return (
          <>
            <Helmet>
              <title>About Page</title>
              <meta name="description" content="About" />
            </Helmet>

            <Header />

            <MainContent pageName="About Page" />

            <Footer />
          </>
        );
      }


    }

  };

  export default About;
