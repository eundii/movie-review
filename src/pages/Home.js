import React, { useContext, useEffect, useState } from "react";
import { MovieStateContext } from "../App";
import Header from "../components/Header";
import HomeList from "../components/HomeList";
import Search from "../components/Search";

function Home() {
  const homeList = useContext(MovieStateContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (homeList) {
      setData(homeList);
    }
  }, [homeList]);
  return (
    <>
      <Header />
      <div className="layout-container">
        <Search />
        {data && (
          <>
            <HomeList title={"인기순"} homeList={data.popular} />
            <HomeList title={"평점순"} homeList={data.topRated} />
            <HomeList title={""} homeList={data.latest} />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
