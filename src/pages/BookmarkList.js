import React, { useContext } from "react";

import { IMAGE_BASE_URL } from "../api/baseUrl";

import sectionCss from "../scss/section.module.scss";
import bookmarkCss from "../scss/bookmarkList.module.scss";

import { MovieStateContext } from "./../App";
import { useNavigate } from "react-router-dom";
import { getStringDate } from "../util/date";

function BookmarkList() {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const bookmarks = useContext(MovieStateContext);

  const navigate = useNavigate();

  const goMovieDetail = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="layout-container">
      <section className={sectionCss.section}>
        <h3 className={sectionCss.title}>내가 찜한 영화</h3>
        <div className={bookmarkCss.bookmark}>
          {bookmarks.length >= 1 ? (
            <ul className={bookmarkCss.bookmark_list}>
              <li>
                <div className={bookmarkCss.bookmark_total}>
                  <div className={bookmarkCss.total_area}>
                    <p className={bookmarkCss.total_text}>
                      총
                      <span className={bookmarkCss.point_text}>
                        {bookmarks.length}개
                      </span>
                      를<br />
                      찜해놨어요!
                    </p>
                  </div>
                  <span className={bookmarkCss.sub_text}>
                    <span>
                      영화 정보가 궁금하다면
                      <br />
                      영화를 클릭하세요
                    </span>
                  </span>
                </div>
              </li>
              {bookmarks.map((item) => (
                <li key={item.id} onClick={() => goMovieDetail(item.id)}>
                  <img
                    src={
                      item.movieImg
                        ? `${IMAGE_BASE_URL}w500${item.movieImg}`
                        : process.env.PUBLIC_URL + `/assets/no_image_poster.png`
                    }
                    alt={item.original_title}
                  />
                  <div className={bookmarkCss.title_area}>
                    <p className={bookmarkCss.title}>{item.movieTitle}</p>
                    <p className={bookmarkCss.date}>
                      찜한 날짜 : {getStringDate(new Date(item.date))}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={bookmarkCss.empty_area}>
              <p className={bookmarkCss.empty_title}>
                아직 찜한 영화가 없어요🤔
              </p>
              <p className={bookmarkCss.empty_text}>
                보고 싶은 영화를 고르고 목록을 만들어보세요
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BookmarkList;
