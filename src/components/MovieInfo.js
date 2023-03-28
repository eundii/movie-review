import React, { useState } from "react";
import { IMAGE_BASE_URL } from "../api/baseUrl";

import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

import sectionCss from "../scss/section.module.scss";
import movieCss from "../scss/movieInfo.module.scss";
import btnCss from "../scss/btn.module.scss";

function MovieInfo({ movie, credits }) {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const [active, setActive] = useState(false);

  const onFavoriteToggle = () => {
    active ? setActive(false) : setActive(true);
  };

  const casting = credits.cast.slice(0, 5);

  return (
    <section className={sectionCss.section}>
      <h3 className={sectionCss.title}>영화 정보</h3>
      <div className={movieCss.movie}>
        {movie && (
          <div className={movieCss.movie_content}>
            <div className={movieCss.movie_left}>
              <div className={movieCss.img_area}>
                <img
                  src={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : process.env.PUBLIC_URL + `/assets/no_image_poster.png`
                  }
                  alt={movie.title}
                />
              </div>
            </div>
            <div className={movieCss.movie_right}>
              <div className={movieCss.info_section}>
                <h4>기본 정보</h4>
                <div className={movieCss.basic_info}>
                  <div className={movieCss.info_area}>
                    <div className={movieCss.info_left}>
                      <p className={movieCss.title}>{movie.title}</p>
                      <p className={movieCss.date}>
                        <span>{movie.release_date}</span>
                      </p>
                    </div>
                    <div className={movieCss.info_right}>
                      <div className={movieCss.btn_area}>
                        <button
                          type="button"
                          className={[
                            btnCss.btn_icon,
                            `${active ? btnCss.active : ""}`,
                          ].join(" ")}
                          onClick={onFavoriteToggle}
                        >
                          {active ? <MdFavorite /> : <MdFavoriteBorder />}
                          <span className="sr-only">찜하기</span>
                        </button>
                        <button type="button" className={btnCss.btn_icon}>
                          {<FaPencilAlt />}
                          <span className="sr-only">평가하기</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <ul className={movieCss.genres_list}>
                    {movie.genres.map((genre, idx) => (
                      <li key={idx}>
                        <span>{genre.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={movieCss.overview}>
                  <p>{movie.overview}</p>
                </div>
              </div>
              {credits.cast.length ? (
                <div className={movieCss.info_section}>
                  <h4>출연 정보</h4>
                  <ul className={movieCss.cast_info}>
                    {casting.map((cast) => (
                      <li key={cast.cast_id}>
                        <div className={movieCss.cast_info_content}>
                          <div className={movieCss.cast_img}>
                            <img
                              src={
                                cast.profile_path
                                  ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                                  : process.env.PUBLIC_URL +
                                    `/assets/no_image_poster.png`
                              }
                              alt={cast.name}
                            />
                          </div>
                          <div className={movieCss.cast_name}>
                            <p className={movieCss.name}>{cast.name}</p>
                            <p className={movieCss.character}>
                              {cast.character}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MovieInfo;
