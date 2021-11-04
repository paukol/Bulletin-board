import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import clsx from "clsx";

import { connect } from "react-redux";
import {
  getAll,
  getLoadingState,
  fetchPublished,
} from "../../../redux/postsRedux.js";
import { getStatus } from "../../../redux/userSwitcherRedux.js";

import styles from "./Homepage.module.scss";

import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

import { Error } from "../../common/Error/Error";
import { PostBox } from "../../features/PostBox/PostBox";

class Component extends React.Component {
  componentDidMount() {
    const { fetchPublishedPosts} = this.props;
    fetchPublishedPosts();
  }

  render() {
    const {
      className,
      posts,
      userStatus,
      loading: { active, error },
    } = this.props;

    if (active) {
      return (
        <Paper className={styles.component}>
        </Paper>
      );
    } else if (post.length === 0 ) { 
      return (
        <Paper className={styles.component}>
        <h2>ups... there are no posts</h2>
        </Paper>
      );
    } else if (error) {
      return (
        <Paper className={styles.component}>
          <Error>{error}</Error>
        </Paper>
      );
    } else {
      return (
        <div className={clsx(className, styles.root)}>
          {userStatus === true ? (
            <div className={styles.buttonAdd}>
              <Link to={"/post/add"} variant="subtitle1" color="secondary">
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="add"
                  variant="extended"
                >
                  Add new add
                </Fab>
              </Link>
            </div>
          ) : null}
          {posts.map((post) => (
            <PostBox
              photo={post.photo}
              title={post.title}
              created={post.created}
              updated={post.updated}
              text={post.text}
              id={post._id}
              userStatus={userStatus}
            />
          ))}
        </div>
      );
    }
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  userStatus: PropTypes.bool,
  posts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  posts: getAll(state),
  userStatus: getStatus(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export { Container as Homepage, Component as HomepageComponent };
