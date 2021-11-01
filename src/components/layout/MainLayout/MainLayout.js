import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import styles from "./MainLayout.module.scss";
import { Header } from "../Header/Header";
import { Switcher } from "../../common/Switcher/Switcher";

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.container}>
      <Switcher className={styles.switcher} />
      <Header className={styles.header} />

      {children}
    </div>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as MainLayout,
  Component as MainLayoutComponent,
};
