import "./editTask.css";
import React, {useState} from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import Error404 from "../Error404";
import TitleSection from "./1-TitleSection";
import SubTasksSection from "./2-SubTasksSection";
import BtnSection from "./3-BtnSection";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firbase/config";
import { doc , updateDoc, arrayRemove, deleteDoc} from "firebase/firestore";
import { db } from "../../firbase/config";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";



const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
  let { stringId } = useParams();
  const navigate = useNavigate();
  // ======================
  // 1- Title Section
  // ======================
  const titleInput = async (eo) => {
    await updateDoc(doc(db, user.uid, stringId), {
      // @ts-ignore
      title: eo.target.value,
    });
  };

  // ======================
  // 2- Sub-Task Section
  // ======================
  const completedCheckbox = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: false,
      });
    }
  };

  const trashIcon = async (item) => {
    await updateDoc(doc(db, user.uid, stringId), {
      details: arrayRemove(item),
   });
  };


  // ======================
  // 3- BTNs Section
  // ======================
  
  const [showData, setshowData] = useState(false);
  const deleteBTN = async () => {
    setshowData(true);
    await deleteDoc(doc(db, user.uid, stringId));
    navigate("/", { replace: true });
  };

  if (error) {
    return <Error404 />;
  }

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return (
      <div>
        <Helmet>
          <title>edit task Page</title>
        </Helmet>

        <Header />
       
        {showData ? (
          <main>
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={77}
              width={77}
            />
          </main>
        ) : (
          <div className="edit-task">
            {/* Title */}
            <TitleSection
              user={user}
              stringId={stringId}
              titleInput={titleInput}
            />

            {/* Sub-tasks section */}
            <SubTasksSection
              user={user}
              stringId={stringId}
              completedCheckbox={completedCheckbox}
              trashIcon={trashIcon}
            />

            {/* Add-more BTN && Delete BTN */}

            <BtnSection
              user={user}
              stringId={stringId}
              deleteBTN={deleteBTN}
            />
          </div>
        )}

        <Footer />
      </div>
    );
  }
};

export default EditTask;
