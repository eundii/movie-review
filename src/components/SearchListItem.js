import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../api/baseUrl";
import searchItemCss from "../scss/searchList.module.scss";

function SearchListItem({ ...item }) {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const navigate = useNavigate();

  const goMovieDetail = (id) => {
    navigate(`/movie/${id}`);
  };

  const { title, release_date, poster_path, vote_average } = item;

  return (
    <div
      className={searchItemCss.search_item}
      onClick={() => goMovieDetail(item.id)}
    >
      <div className={searchItemCss.item_img}>
        <img
          src={
            poster_path
              ? `${IMAGE_BASE_URL}w500${poster_path}`
              : process.env.PUBLIC_URL + `/assets/no_image_poster.png`
          }
          alt={title}
        />
      </div>
      <div className={searchItemCss.item_dec}>
        <p className={searchItemCss.item_title}>{title}</p>
        <p className={searchItemCss.item_date}>{release_date}</p>
        <p className={searchItemCss.item_rate}>평균 ★{vote_average}</p>
      </div>
    </div>
  );
}

export default SearchListItem;
