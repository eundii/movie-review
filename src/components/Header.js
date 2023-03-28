import React from "react";
import { Link } from "react-router-dom";
import styles from "../scss/header.module.scss";
import Search from "./Search";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_contents}>
        <h1 className={styles.logo}>
          <Link to={"/"}>
            <span>Eundii</span> Movie
          </Link>
        </h1>
        <nav>
          <Search />
          <ul>
            <li>
              <Link to={"/bookmark"}>북마크</Link>
            </li>
            <li>
              <Link to={"/reviewlist"}>평가</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
