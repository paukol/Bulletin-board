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
import { addPostRequest } from "../../../redux/postsRedux.js";
import styles from "./PostAdd.module.scss";
import { NotFound } from "../NotFound/NotFound.js";

class Component extends React.Component {
  state = {
    post: {
      author: "",
      created: "",
      updated: "",
      status: "",
      title: "",
      text: "",
      photo: null,
      price: "",
      phone: "",
      location: "",
    },
  };
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

  handlePrice = (event) => {
    const { post } = this.state;

    this.setState({
      post: { ...post, [event.target.name]: parseInt(event.target.value) },
    });
  };

  submitForm = (e) => {
    const { post } = this.state;
    const { addNewPost } = this.props;
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
    } else if (!post.status) {
      alert("You have to choose status");
      error = "text too short";
    } else if (!emailPattern.test(post.author)) {
      alert("Your email adress is not valid!");
      error = "wrong email";
    }
    if (!error) {
      post.created = new Date().toISOString();
      post.updated = post.created;

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

      addNewPost(formData);

      alert("Thank you for your add!");
      window.location = "/";
    } else {
      alert("Please correct errors before submitting your add!");
    }
  };
  render() {
    const { className, userStatus } = this.props;
    const { post } = this.state;
    return (
      <div className={clsx(className, styles.root)}>
        {userStatus === true ? (
          <Grid container align="center" justify="center">
            <Grid item align="center" xs={12} sm={9}>
              <Paper className={styles.form}>
                <form onSubmit={this.submitForm}>
                  <Typography variant="h6">
                    Fill the fields to add an announcement
                  </Typography>

                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="title"
                      label="Title"
                      variant="filled"
                      onChange={this.handleChange}
                      helperText="min. 10 characters"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="text"
                      label="Give the full description!"
                      variant="filled"
                      onChange={this.handleChange}
                      helperText="min. 20 characters"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="author"
                      label="Your Email"
                      variant="filled"
                      onChange={this.handleChange}
                      helperText="Put your vaild email"
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
                      onChange={this.handlePrice}
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
                        required
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
                      imgExtension={[".jpg", ".gif", ".png", ".jpeg", ".jfif"]}
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
  addNewPost: PropTypes.func,
};

const mapStateToProps = (state) => ({
  userStatus: getStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  addNewPost: (post) => dispatch(addPostRequest(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
