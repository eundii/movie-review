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

const reducer = (state, action) => {
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
    case "EDIT": {
      newState = state.map((item) =>
        item.id === action.data.id ? { ...action.data } : item
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("review", JSON.stringify(newState));
  return newState;
};

export const MovieStateContext = React.createContext();
export const MovieDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("review");
    if (localData) {
      const reviewList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (reviewList.length >= 1) {
        dataId.current = parseInt(reviewList[0].id) + 1;
        dispatch({ type: "INIT", data: reviewList });
      }
    }
  }, []);

  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <div className="App">
      <MovieStateContext.Provider value={data}>
        <MovieDispatchContext.Provider
          value={{
            onCreate,
            onEdit,
            onRemove,
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
