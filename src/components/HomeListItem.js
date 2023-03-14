import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../api/baseUrl";

import styles from "../scss/homeList.module.scss";

function HomeListItem({ ...item }) {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const navigate = useNavigate();

  const goMovieDetail = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className={styles.item}>
      <div className={styles.item_img}>
        <img
          src={
            item.poster_path
              ? `${IMAGE_BASE_URL}w500${item.poster_path}`
              : process.env.PUBLIC_URL + `/assets/no_image_poster.png`
          }
          alt={item.original_title}
        />
      </div>
      <div className={styles.item_dec} onClick={() => goMovieDetail(item.id)}>
        <p className={styles.item_title}>{item.title}</p>
        <p className={styles.item_date}>{item.release_date}</p>
        <p className={styles.item_rate}>평균 ★{item.vote_average}</p>
      </div>
    </div>
  );
}

export default HomeListItem;
