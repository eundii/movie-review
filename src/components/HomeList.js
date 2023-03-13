import React, { useEffect, useState } from "react";
import styles from "../scss/home.module.scss";
import HomeListItem from "./HomeListItem";

function HomeList({ title, homeList }) {
  return (
    <section>
      <h3 className={styles.title}>{title}</h3>
      <ul>
        {homeList &&
          homeList.map((item, idx) => (
            <HomeListItem key={`popular_${item.id}`} {...item} />
          ))}
      </ul>
    </section>
  );
}

export default HomeList;
