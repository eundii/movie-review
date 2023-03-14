import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY, IMAGE_BASE_URL } from "../api/baseUrl";
import { useParams } from "react-router-dom";

import styles from "../scss/movieDetail.module.scss";
import MovieInfo from "../components/MovieInfo";
import HomeList from "../components/HomeList";

function MovieDetail() {
  let { id } = useParams();
  const [data, setData] = useState(null);

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  useEffect(() => {
    const apiUrlMovie = `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=ko`;
    const apiUrlCredits = `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}&language=ko`;
    const apiUrlSimilar = `${BASE_URL}movie/${id}/similar?api_key=${API_KEY}&language=ko`;

    const fetchMovie = async () => {
      try {
        axios
          .all([
            axios.get(apiUrlMovie),
            axios.get(apiUrlCredits),
            axios.get(apiUrlSimilar),
          ])
          .then(
            axios.spread((res1, res2, res3) => {
              const movie = res1.data;
              const credits = res2.data;
              const similar = res3.data.results;
              setData({
                movie,
                credits,
                similar,
              });
            })
          );
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovie();
  }, [id]);

  return (
    <>
      {data && (
        <div className="container">
          <div className={styles.main}>
            <div className={styles.main_image_area}>
              <div className={styles.main_image}>
                <img
                  src={
                    data.movie.backdrop_path
                      ? `${IMAGE_BASE_URL}original${data.movie.backdrop_path}`
                      : process.env.PUBLIC_URL + `/assets/no_image_backdrop.png`
                  }
                  alt={data.movie.title}
                />
              </div>
            </div>
            <div className={styles.main_desc}>
              <div className={styles.main_title}>
                <p className={styles.movie_title}>{data.movie.title}</p>
                <p className={styles.movie_tagline}>{data.movie.tagline}</p>
              </div>
              <div className={styles.main_text}>
                <span className={styles.movie_date}>
                  {data.movie.release_date.slice(0, 4)}
                </span>
                <span className={styles.movie_rate}>
                  평균 ★{data.movie.vote_average} ({data.movie.vote_count})
                </span>
              </div>
            </div>
          </div>
          <div className="layout-container">
            <MovieInfo movie={data.movie} credits={data.credits} />
            {data.similar.length ? (
              <HomeList
                title={"비슷한 장르 영화를 추천해드려요"}
                homeList={data.similar}
                view={5}
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetail;
