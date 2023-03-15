import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../api/baseUrl";
import axios from "axios";
import searchListCss from "../scss/searchList.module.scss";
import SearchListItem from "../components/SearchListItem";

function SearchList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const search = searchParams.get("query");

  useEffect(() => {
    const apiUrlSearch = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${search}&language=ko&page=1`;

    const fetchSearch = async () => {
      try {
        const response = await axios.get(apiUrlSearch);
        setData(response.data);
        setMovies(response.data.results);
        setCurrentPage(response.data.page);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSearch();
  }, [search]);

  const loadMoreItem = () => {
    const apiUrlSearch = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${search}&language=ko&page=${
      currentPage + 1
    }`;

    const fetchSearch = async () => {
      try {
        const response = await axios.get(apiUrlSearch);
        setData(response.data);
        setMovies([...movies, ...response.data.results]);
        setCurrentPage(response.data.page);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSearch();
  };

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
          {data && (
            <>
              <div className={searchListCss.search_list_result}>
                {movies.map((item) => (
                  <SearchListItem key={item.id} {...item} />
                ))}
              </div>
              <div className={searchListCss.search_load_more}>
                {data.total_pages > currentPage ? (
                  <button type="button" onClick={loadMoreItem}>
                    더보기
                  </button>
                ) : null}
              </div>
            </>
          )}
        </div>
      ) : (
        navigate("/", { replace: true })
      )}
    </div>
  );
}

export default SearchList;
