import React, { useRef, useState } from "react";
import searchCss from "../scss/search.module.scss";
import { TbSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function Search() {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const updateSearchInput = (value) => {
    inputRef.current.value = value;
    inputRef.current.blur();
  };

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  const onSearch = () => {
    const currentValue = inputRef.current.value;
    if (!currentValue.length) {
      alert("검색어를 입력해주세요.");
      return false;
    }
    navigate(`/search?query=${currentValue}`);
    updateSearchInput("");
  };

  return (
    <div className={searchCss.search}>
      <input
        placeholder="영화 제목을 검색해주세요"
        onKeyDown={onSearchKeyDown}
        ref={inputRef}
      />
      <button type="button" onClick={onSearch}>
        <TbSearch />
        <span className="sr-only">검색</span>
      </button>
    </div>
  );
}

export default Search;
