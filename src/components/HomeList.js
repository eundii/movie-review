import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "../scss/home.module.scss";
import HomeListItem from "./HomeListItem";

function HomeList({ title, homeList }) {
  const sliderSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  return (
    <section>
      <h3 className={styles.title}>{title}</h3>
      <div>
        <Slider {...sliderSettings}>
          {homeList &&
            homeList.map((item, idx) => (
              <HomeListItem key={`${item.id}`} {...item} />
            ))}
        </Slider>
      </div>
    </section>
  );
}

export default HomeList;
