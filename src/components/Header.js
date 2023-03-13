import React from "react";
import { Link } from "react-router-dom";
import styles from "../scss/header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <h1 className={styles.logo}>
          <Link to={"/"}>
            Movie <span>Diary</span>
          </Link>
        </h1>
        <ul>
          <li>
            <Link to={"/search"}>평가</Link>
          </li>
          <li>
            <Link to={"/review"}>북마크</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
