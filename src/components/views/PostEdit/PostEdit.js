import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ImageUploader from "react-images-upload";

import { connect } from "react-redux";
import { getStatus } from "../../../redux/userSwitcherRedux.js";
import {
  editPostRequest,
  getOne,
  fetchOnePostFromAPI,
} from "../../../redux/postsRedux.js";
import { fetchLogged, getLoggedUser } from "../../../redux/usersRedux.js";

import styles from "./PostEdit.module.scss";
import { NotFound } from "../NotFound/NotFound.js";

class Component extends React.Component {
  state = {
    post: {},
    error: null,
    user: this.props.currentUser,
  };
  componentDidMount() {
    const { fetchPost, postToEdit, fetchUser, currentUser } = this.props;
    fetchPost();
    fetchUser();
    this.setState({
      post: { ...postToEdit },
      user: currentUser,
    });
  }
  componentDidUpdate(prevProps) {
    const { fetchPost, postToEdit } = this.props;
    if (postToEdit === {} || postToEdit._id !== prevProps.postToEdit._id) {
      fetchPost();
      this.setState({
        post: { ...postToEdit },
      });
    }
  }

  setPhoto = (files) => {
    const { post } = this.state;

    if (files) this.setState({ post: { ...post, photo: files[0] } });
    else this.setState({ post: { ...post, photo: null } });
  };

  handleChange = (event) => {
    const { post } = this.state;

    this.setState({
      post: { ...post, [event.target.name]: event.target.value },
    });
  };

  submitForm = (e) => {
    const { post } = this.state;
    const { updatePost } = this.props;
    e.preventDefault();

    let error = null;
    const emailPattern = new RegExp(
      "^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+.{1,3}[a-zA-Z]{2,4}"
    );

    if (post.title.length < 10) {
      alert("The title is too short");
      error = "text too short";
    } else if (post.text.length < 20) {
      alert("The content is too short");
      error = "text too short";
    } else if (!emailPattern.test(post.author)) {
      alert("Your email adress is not valid!");
      error = "wrong email";
    }
    if (!error) {
      post.updated = new Date().toISOString();

      const formData = new FormData();

      for (let key of [
        "author",
        "created",
        "updated",
        "status",
        "title",
        "text",
        "price",
        "phone",
        "location",
        "photo",
      ]) {
        formData.append(key, post[key]);
      }

      updatePost(formData);

      this.setState({
        post: {
          _id: "",
          author: "",
          created: "",
          updated: "",
          status: "",
          title: "",
          text: "",
          photo: "",
          price: "",
          phone: "",
          location: "",
        },
      });
      alert("Your changes have been saved!");
      window.location = `/post/${post._id}`;
    } else {
      alert("Please correct errors before submitting changes!");
    }
  };
  render() {
    const { className, userStatus } = this.props;
    const { post, user } = this.state;
    return (
      <div className={clsx(className, styles.root)}>
        {userStatus === true ? (
          <Grid container align="center" justify="center">
            <Grid item align="center" xs={12} sm={9}>
              <Paper className={styles.form}>
                <form onSubmit={this.submitForm}>
                  <Typography variant="h6">
                    <p>{user.userName}</p>
                    <p>Edit your announcement</p>
                  </Typography>

                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="title"
                      label="Title"
                      variant="filled"
                      onChange={this.handleChange}
                      value={post.title}
                      helperText="min. 10 characters"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="text"
                      label="Give the full description!"
                      variant="filled"
                      onChange={this.handleChange}
                      value={post.text}
                      helperText="min. 20 characters"
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="author"
                      label="Your Email"
                      variant="filled"
                      onChange={this.handleChange}
                      value={post.author}
                      helperText="Put your valid email"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="location"
                      label="Location"
                      variant="filled"
                      onChange={this.handleChange}
                      value={post.location}
                      helperText="Location"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="price"
                      label="Price"
                      variant="filled"
                      onChange={this.handleChange}
                      value={post.price}
                      helperText="Price in EUR"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="phone"
                      label="Phone number"
                      variant="filled"
                      onChange={this.handleChange}
                      value={post.phone}
                      helperText="Give you contact number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <FormControl fullWidth>
                      <InputLabel id="status">Status of your add</InputLabel>
                      <Select
                        labelId="status"
                        id="status"
                        onChange={this.handleChange}
                        fullWidth
                        variant="filled"
                        name="status"
                        value={post.status}
                      >
                        <MenuItem value="draft">draft</MenuItem>
                        <MenuItem value="published">published</MenuItem>
                        <MenuItem value="closed">closed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <Typography align="center">Add photo</Typography>
                    <ImageUploader
                      withIcon={true}
                      buttonText="Choose image"
                      imgExtension={[".jpg", ".gif", ".png", ".gif", ".jfif"]}
                      maxFileSize={5242880}
                      withPreview={true}
                      onChange={this.setPhoto}
                      singleImage={true}
                      className={styles.file}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} align="center">
                    <Button variant="contained" type="submit" color="secondary">
                      Submit
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <NotFound />
        )}
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  userStatus: PropTypes.bool,
  updatePost: PropTypes.func,
  postToEdit: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  userStatus: getStatus(state),
  postToEdit: getOne(state),
  currentUser: getLoggedUser(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  updatePost: (post) => dispatch(editPostRequest(post, props.match.params.id)),
  fetchPost: () => dispatch(fetchOnePostFromAPI(props.match.params.id)),
  fetchUser: () => dispatch(fetchLogged()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export { Container as PostEdit, Component as PostEditComponent };
