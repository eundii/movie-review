import React from "react";

import sectionCss from "../scss/section.module.scss";
import bookmarkCss from "../scss/bookmarkList.module.scss";

function BookmarkList() {
  return (
    <div className="layout-container">
      <section className={sectionCss.section}>
        <h3 className={sectionCss.title}>내가 찜한 영화</h3>
        <div className={bookmarkCss.bookmark}>
          <ul className={bookmarkCss.bookmark_list}>
            <li>
              <p>
                총 <span className={bookmarkCss.point_text}>19개</span>를<br />
                찜해놨어요!
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default BookmarkList;
