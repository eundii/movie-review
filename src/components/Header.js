import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../scss/header.module.scss";
import Search from "./Search";

function Header() {
  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  return (
    <header className={styles.header}>
      <div className={styles.header_contents}>
        <div className={styles.nav_area}>
          <h1 className={styles.logo}>
            <Link to={"/"}>
              <span>Eundii</span> Movie
            </Link>
          </h1>
          <nav>
            <ul>
              <li
                className={splitLocation[1] === "bookmark" ? styles.active : ""}
              >
                <Link to={"/bookmark"}>북마크</Link>
              </li>
              {/* <li
              className={splitLocation[1] === "reviewlist" ? styles.active : ""}
            >
              <Link to={"/reviewlist"}>평가</Link>
            </li> */}
            </ul>
          </nav>
        </div>
        <div className={styles.search_area}>
          <Search />
        </div>
      </div>
    </header>
  );
}

export default Header;
