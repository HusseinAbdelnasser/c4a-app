
import React from "react";


const SubTasksSection = ({  deleteBTN }) => {
  return (
    <section className="center ">
      <div>
        <button onClick={() => {
          deleteBTN();
        }} className="delete">Delete task</button>
      </div>
    </section>
  );
};

export default SubTasksSection;
