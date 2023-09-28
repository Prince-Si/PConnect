// Logo.js

import React from "react";
import styles from "../static/logo.module.css"; // Import your CSS file

function Logo() {
  return (
    <div className={styles.logo}>
      <div className={styles['logo-inner']}>
        <h1 className={styles['logo-text']}>PConnect</h1>
      </div>
    </div>
  );
}

export default Logo;
