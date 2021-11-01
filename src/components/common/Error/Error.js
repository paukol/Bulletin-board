import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import styles from "./Error.module.scss";

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.error}>
      <h2>We are sorry.. something went wrong..</h2>
      <p>{children}</p>
    </div>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Error, Component as ErrorComponent };
