import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

//import styles from "./Switcher.module.scss";
import { connect } from "react-redux";
import { getUserStatus } from "../../../redux/userSwitcherRedux.js";

class Component extends React.Component {
  handleOnChange = (event) => {
    const { getUserStatus, user } = this.props;

    if (event === "true") {
      user.active = true;
      getUserStatus(true);
    } else {
      user.active = false;
      getUserStatus(false);
    }
  };
  render() {
    return (
      <FormControl>
        <InputLabel id="user-status">User Status</InputLabel>
        <Select
          labelId="user-status"
          id="user-status"
          onChange={(event) => this.handleOnChange(event.target.value)}
        >
          <MenuItem value="true">Logged User</MenuItem>
          <MenuItem value="false">Unlogged User</MenuItem>
          <MenuItem value="true">Admin</MenuItem>
        </Select>
      </FormControl>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUserStatus: (status) => dispatch(getUserStatus(status)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Switcher,
  Component as SwitcherComponent,
};
