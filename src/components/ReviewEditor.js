import React from "react";
import sectionCss from "../scss/section.module.scss";

function ReviewEditor() {
  return (
    <>
      <section className={sectionCss.section}>
        <h3 className={sectionCss.title}>영화 리뷰 작성하기</h3>
      </section>
    </>
  );
}

export default ReviewEditor;
