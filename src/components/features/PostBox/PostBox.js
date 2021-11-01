import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

import { connect } from "react-redux";
import { getStatus } from "../../../redux/userSwitcherRedux.js";

import styles from "./PostBox.module.scss";

const Component = ({
  className,
  photo,
  title,
  created,
  updated,
  text,
  id,
  userStatus,
}) => (
  <div className={clsx(className, styles.root)}>
    <Paper key={id} className={styles.component} elevation={9}>
      <Grid container spacing={3} alignContent="center" justify="center">
        <Grid item xs={12} sm={12} md={6}>
          <div className={styles.photoWrapper}>
            <img src={photo} alt={title} />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Card className={styles.card}>
            <CardHeader
              title={title}
              className={styles.header}
            />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={styles.text}
              >
                {text}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <div className={styles.linkWrapper}>
                <Link to={`/post/${id}/`} variant="subtitle1" color="secondary">
                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    className={styles.fab}
                  >
                    More details
                  </Fab>
                </Link>
              </div>

              {userStatus === true ? (
                <div className={styles.linkWrapper}>
                  <Link
                    to={`/post/${id}/edit`}
                    variant="subtitle1"
                    color="secondary"
                  >
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="add"
                      variant="extended"
                      className={styles.fab}
                    >
                      <span>Edit post</span>
                    </Fab>
                  </Link>
                </div>
              ) : null}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  </div>
);

Component.propTypes = {
  photo: PropTypes.string,
  title: PropTypes.string,
  created: PropTypes.string,
  updated: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.string,
  userStatus: PropTypes.object,
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userStatus: getStatus(state),
});

const Container = connect(mapStateToProps)(Component);

export { Container as PostBox, Component as PostBoxComponent };
