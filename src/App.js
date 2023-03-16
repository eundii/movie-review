import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { API_KEY, BASE_URL } from "./api/baseUrl";

import axios from "axios";
import "./scss/style.scss";

import Home from "./pages/Home";
import SearchList from "./pages/SearchList";
import ReviewList from "./pages/ReviewList";
import ReviewDetail from "./pages/ReviewDetail";
import MovieDetail from "./pages/MovieDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const MovieStateContext = React.createContext();
export const MovieDispatchContext = React.createContext();

function App() {
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
    <div className="App">
      <MovieStateContext.Provider value={data}>
        <MovieDispatchContext.Provider value={[]}>
          <BrowserRouter>
            <Header />
            <div className="container">
              <Routes>
                <Route path="" element={<Home />} />
                <Route path="/search" element={<SearchList />} />
                {/* <Route path="/review/:id" element={<ReviewList />} />
                <Route path="/detail/:id" element={<ReviewDetail />} /> */}
                <Route path="/movie/:id" element={<MovieDetail />} />
              </Routes>
            </div>
          </BrowserRouter>
        </MovieDispatchContext.Provider>
      </MovieStateContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
