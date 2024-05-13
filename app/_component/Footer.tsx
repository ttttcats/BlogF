import React from "react";
import styles from "../../styles/module/SideBar.module.scss";
function Footer() {
  return (
    <div className={styles.footer}>
      <p>Copyright ©2024 BEOM All rights reserved.</p>
    </div>
  );
}

export default React.memo(Footer);
