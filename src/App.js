import React, { useEffect, useState, useReducer, useRef } from "react";
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

const reducerBookmark = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("bookmarks", JSON.stringify(newState));
  return newState;
};

export const MovieStateContext = React.createContext();
export const MovieDispatchContext = React.createContext();

function App() {
  const [data, dispatchBookmark] = useReducer(reducerBookmark, []);

  useEffect(() => {
    const localDataBookmarks = localStorage.getItem("bookmarks");
    if (localDataBookmarks) {
      const bookmarks = JSON.parse(localDataBookmarks);

      if (bookmarks.length >= 1) {
        dispatchBookmark({ type: "INIT", data: bookmarks });
      }
    }
  }, []);

  // CREATE
  const onCreateBookmark = (date, movie) => {
    dispatchBookmark({
      type: "CREATE",
      data: {
        id: movie.id,
        date: new Date(date).getTime(),
        movieTitle: movie.title,
        movieImg: movie.poster_path,
      },
    });
  };

  // REMOVE
  const onRemoveBookmark = (targetId) => {
    dispatchBookmark({ type: "REMOVE", targetId });
  };

  return (
    <div className="App">
      <MovieStateContext.Provider value={data}>
        <MovieDispatchContext.Provider
          value={{
            onCreateBookmark,
            onRemoveBookmark,
          }}
        >
          <BrowserRouter>
            <Header />
            <div className="container">
              <Routes>
                <Route path="" element={<Home />} />
                <Route path="/search" element={<SearchList />} />
                <Route path="/bookmark" element={<BookmarkList />} />
                <Route path="/reviewlist" element={<ReviewList />} />
                <Route path="/review/:id" element={<ReviewDetail />} />
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
