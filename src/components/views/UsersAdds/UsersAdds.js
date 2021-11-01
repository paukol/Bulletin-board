import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import clsx from "clsx";

import { connect } from "react-redux";
import {
  getAll,
  getLoadingState,
  fetchUserPosts,
} from "../../../redux/postsRedux.js";
import { getStatus } from "../../../redux/userSwitcherRedux.js";
import { fetchLogged, getLoggedUser } from "../../../redux/usersRedux.js";

import styles from "./UsersAdds.module.scss";

import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

import { Loading } from "../../common/Loading/Loading";
import { Error } from "../../common/Error/Error";
import { PostBox } from "../../features/PostBox/PostBox";

class Component extends React.Component {
  state = {
    post: [],
    error: null,
    user: this.props.currentUser,
  };
  componentDidMount() {
    const { fetchPosts, posts, currentUser, fetchUser } = this.props;
    fetchPosts();
    fetchUser();
    this.setState({
      post: [...posts],
      user: currentUser,
    });
  }
  componentDidUpdate(prevProps) {
    const { fetchPosts, posts } = this.props;
    if (posts === {} || posts !== prevProps.posts) {
      fetchPosts();
    }
  }

  render() {
    const {
      className,
      posts,
      userStatus,
      loading: { active, error },
    } = this.props;
    const { user } = this.state;

    if (active || !posts.length) {
      return (
        <Paper className={styles.component}>
          <Loading />
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
          <h2 className={styles.title}>{user.userName} this are your adds:</h2>
          {posts.map((post) => (
            <PostBox
              photo={post.photo}
              title={post.title}
              created={post.created}
              updated={post.updated}
              text={post.text}
              id={post._id}
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
  currentUser: getLoggedUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchUserPosts()),
  fetchUser: () => dispatch(fetchLogged()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as UsersAdds,
  Component as UsersAddsComponent,
};
