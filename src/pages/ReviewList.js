import React from "react";

import sectionCss from "../scss/section.module.scss";
// import ReviewEditor from "./../components/ReviewEditor";

function ReviewList() {
  return (
    <div className="layout-container">
      <section className={sectionCss.section}>
        <h3 className={sectionCss.title}>내가 평가한 영화</h3>
      </section>
    </div>
  );
}

export default ReviewList;
