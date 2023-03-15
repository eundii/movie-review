import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "../scss/homeList.module.scss";
import sectionCss from "../scss/section.module.scss";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import HomeListItem from "./HomeListItem";

function Arrow(props) {
  const { icons, className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      {icons}
    </div>
  );
}

function HomeList({ title, homeList, view }) {
  const sliderSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    slidesToShow: view,
    slidesToScroll: view,
    swipe: false,
    nextArrow: <Arrow icons={<FaArrowRight />} />,
    prevArrow: <Arrow icons={<FaArrowLeft />} />,
  };
  return (
    <section className={sectionCss.section}>
      <h3 className={sectionCss.title}>{title}</h3>
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
