import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { API_KEY, BASE_URL } from "./api/baseUrl";
import "./scss/style.scss";

import Home from "./pages/Home";
import SearchList from "./pages/SearchList";
import ReviewList from "./pages/ReviewList";
import ReviewDetail from "./pages/ReviewDetail";

export const MovieStateContext = React.createContext();
export const MovieDispatchContext = React.createContext();

function App() {
  const [data, setData] = useState(null);
  // const [query, setQuery] = useState("");

  useEffect(() => {
    const apiUrl = `${BASE_URL}movie/popular?api_key=${API_KEY}`;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data.results); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovies();
  }, []);

  return (
    <MovieStateContext.Provider value={data}>
      <MovieDispatchContext.Provider value={[]}>
        <BrowserRouter>
          <div className="App">
            <div className="container">
              <Routes>
                <Route path="" element={<Home />} />
                <Route path="/search/:id" element={<SearchList />} />
                <Route path="/review/:id" element={<ReviewList />} />
                <Route path="/detail/:id" element={<ReviewDetail />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
}

export default App;
