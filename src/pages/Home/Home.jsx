import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import "./Home.css";
import Erroe404 from "../Error404";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firbase/config";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Modal from "../../shared/Modal";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import ReactLoading from "react-loading";
import AllTasksSection from "./AllTasksSection";
import { useTranslation } from "react-i18next";
import Snack from "../../shared/Snack";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [showLoading, setshowLoading] = useState(false);
  const [showMessage, setshowMessage] = useState(false);

  const [array, setarray] = useState([]);
  const [subTask, setsubTask] = useState("");
  const [taskTitle, settitle] = useState("");

  const addBTN = () => {
    if (!array.includes(subTask)) {
      array.push(subTask);
    }
    console.log(array);
    setsubTask("");
  };

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [showModal, setshowModal] = useState(false);
  const forgotPassword = () => {
    setshowModal(true);
  };

  const closeModal = () => {
    setshowModal(false);
    settitle("");
    setarray([]);
  };

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Erroe404 />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <meta name="description" content="HOMEEEEEEEEEEEE" />
        </Helmet>

        <Header />

        <main>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue... 💛
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main className="home">
            {/* SHOW all tasks */}

            <AllTasksSection user={user} />

            {/* Add new task BTN */}
            <section className="mt">
              <button
                onClick={() => {
                  setshowModal(true);
                }}
                className="add-task-btn"
              >
                {i18n.language === "en" && "Add new task"}
                {i18n.language === "ar" && "أضف مهمة جديدة"}
                {i18n.language === "fr" && "Ajouter une nouvelle tâche"}{" "}
                <i className="fa-solid fa-plus"></i>
              </button>
            </section>

            {showModal && (
              <Modal closeModal={closeModal} backgroundColor= "whitesmoke">
                <div className="model-content">
                  <input
                    value={taskTitle}
                    onChange={(eo) => {
                      settitle(eo.target.value);
                    }}
                    required
                    placeholder=" Add title : "
                    type="text"
                  />

                  <div>
                    <input
                      onChange={(eo) => {
                        setsubTask(eo.target.value);
                      }}
                      placeholder=" details "
                      type="email"
                      value={subTask}
                    />

                    <button
                      onClick={(eo) => {
                        eo.preventDefault();
                        addBTN();
                      }}
                    >
                      Add
                    </button>
                  </div>

                  <ul>
                    {array.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <button
                    style={{ marginBottom: "33px" }}
                    onClick={async (eo) => {
                      eo.preventDefault();
                      setshowLoading(true);
                      const taskId = new Date().getTime();
                      await setDoc(doc(db, user.uid, `${taskId}`), {
                        title: taskTitle,
                        details: array,
                        id: taskId,
                        completed: false,
                      });
                      setshowLoading(false);
                      settitle("");
                      setarray([]);
                      setshowModal(false);
                      setshowMessage(true);
                      setTimeout(() => {
                        setshowMessage(false);
                      }, 4000);
                    }}
                  >
                    {showLoading ? (
                      <ReactLoading
                        type={"spin"}
                        color={"white"}
                        height={20}
                        width={20}
                      />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </Modal>
            )}
            <Snack showMessage={showMessage} message= "Task added successfully"/>
          </main>

          <Footer />
        </>
      );
    }

    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName} <span>💛</span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendEmailVerification(auth.currentUser).then(() => {
                  console.log("Email verification sent!");
                  // ...
                });
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
