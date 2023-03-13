import React, { useContext, useEffect, useState } from "react";
import { MovieStateContext } from "../App";
import Header from "../components/Header";
import HomeList from "../components/HomeList";
import Search from "../components/Search";

function Home() {
  const homeList = useContext(MovieStateContext);

  return (
    <>
      <Header />
      <div className="layout-container">
        <Search />
        <HomeList title={"인기순"} homeList={homeList} />
      </div>
    </>
  );
}

export default Home;
