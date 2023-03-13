import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "../scss/homeList.module.scss";

import HomeListItem from "./HomeListItem";

function HomeList({ title, homeList, view }) {
  const sliderSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    slidesToShow: view,
    slidesToScroll: view,
  };
  return (
    <section class={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.contents}>
        <Slider {...sliderSettings}>
          {homeList &&
            homeList.map((item) => (
              <HomeListItem key={`${item.id}`} {...item} />
            ))}
        </Slider>
      </div>
    </section>
  );
}

export default HomeList;
