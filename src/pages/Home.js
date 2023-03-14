import React, { useContext, useEffect, useState } from "react";
import { MovieStateContext } from "../App";
import HomeList from "../components/HomeList";

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
      <div className="layout-container">
        {data && (
          <>
            <HomeList
              title={"요즘 가장 인기있어요🤩"}
              homeList={data.popular}
              view={4}
            />
            <HomeList
              title={"평가가 좋은 영화❤️"}
              homeList={data.topRated}
              view={5}
            />
            <HomeList title={"최근 상영중🎬"} homeList={data.latest} view={5} />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
