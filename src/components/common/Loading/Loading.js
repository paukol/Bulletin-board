import React from "react";
import PropTypes from "prop-types";

import LinearProgress from "@material-ui/core/LinearProgress";

import clsx from "clsx";

import styles from "./Loading.module.scss";

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.loading}>
      <LinearProgress />
      <h2>Loading...</h2>
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

export { Component as Loading, Component as LoadingComponent };
