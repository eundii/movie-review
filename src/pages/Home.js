import React, { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../api/baseUrl";

import axios from "axios";
import HomeList from "../components/HomeList";

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrlPopular = `${BASE_URL}movie/popular?api_key=${API_KEY}&language=ko`;
    const apiUrlTopRated = `${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=ko`;
    const apiUrlLatest = `${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=ko`;

    const fetchMovies = async () => {
      try {
        axios
          .all([
            axios.get(apiUrlPopular),
            axios.get(apiUrlTopRated),
            axios.get(apiUrlLatest),
          ])
          .then(
            axios.spread((res1, res2, res3) => {
              const popular = res1.data.results;
              const topRated = res2.data.results;
              const latest = res3.data.results;
              setData({
                popular,
                topRated,
                latest,
              });
            })
          );
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovies();
  }, []);

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
