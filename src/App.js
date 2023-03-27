import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./scss/style.scss";

import Home from "./pages/Home";
import SearchList from "./pages/SearchList";
import ReviewList from "./pages/ReviewList";
import ReviewDetail from "./pages/ReviewDetail";
import MovieDetail from "./pages/MovieDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookmarkList from "./pages/BookmarkList";

export const MovieStateContext = React.createContext();
export const MovieDispatchContext = React.createContext();

function App() {
  const [data, setData] = useState(null);

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
                <Route path="/bookmark" element={<BookmarkList />} />
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
