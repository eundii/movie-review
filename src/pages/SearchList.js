import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../api/baseUrl";
import axios from "axios";
import searchListCss from "../scss/searchList.module.scss";
import SearchListItem from "../components/SearchListItem";

function SearchList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [movies, setMovies] = useState([]);

  const search = searchParams.get("query");

  useEffect(() => {
    const apiUrlSearch = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${search}&language=ko`;

    const fetchSearch = async () => {
      try {
        const response = await axios.get(apiUrlSearch);
        setData(response.data);
        setMovies([...movies, ...response.data.results]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSearch();
  }, [search]);

  return (
    <div className={searchListCss.search_list}>
      {search ? (
        <div className="layout-container">
          <div className={searchListCss.search_result}>
            <span className={searchListCss.search_text}>'{search}'</span>
            {data && (
              <span className={searchListCss.search_count}>
                총&nbsp;
                <span className={searchListCss.count}>
                  {data.total_results.toLocaleString()}
                </span>
                개의 검색결과 입니다.
              </span>
            )}
          </div>
          <div className={searchListCss.search_list_result}>
            {data &&
              data.results.map((item) => (
                <SearchListItem key={item.id} {...item} />
              ))}
          </div>
          <div className={searchListCss.search_load_more}>
            {/* <button type="button" onClick={loadMoreItem}>
              더 불러오기
            </button> */}
          </div>
        </div>
      ) : (
        <div>잘못된 접근 입니다.</div>
      )}
    </div>
  );
}

export default SearchList;
