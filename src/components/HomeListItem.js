import React from "react";
import { IMAGE_BASE_URL } from "../api/baseUrl";

function HomeListItem({ ...item }) {
  return (
    <li>
      <div>
        <img
          src={
            item.poster_path ? `${IMAGE_BASE_URL}w500${item.poster_path}` : null
          }
          alt={item.original_title}
        />
      </div>
      <div>
        <p>{item.title}</p>
        <p>{item.release_date}</p>
        <p>평균{item.vote_average}</p>
      </div>
    </li>
  );
}

export default HomeListItem;
