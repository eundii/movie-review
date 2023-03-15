import React from "react";
import styles from "../scss/footer.module.scss";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.icon_area}>
        <a
          href="https://github.com/eundii/movie-review"
          className={styles.icon_link}
          title="Eundii GitHub 바로가기"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
          <span className="sr-only">GitHub</span>
        </a>
      </div>
      <p className={styles.text}>
        이 포트폴리오는 React 기반으로 만들어 졌으며, PC/MOBILE 웹 반응형입니다.
      </p>
      <p className={styles.copyright}>© 2023. Eunji Cho All rights reserved.</p>
    </footer>
  );
}

export default Footer;
