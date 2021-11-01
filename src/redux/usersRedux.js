import Axios from "axios";
import { API_URL } from "../config";
/* selectors */
export const getAllUsers = ({ users }) => users.data;
export const getLoggedUser = ({ users }) => users.loggedUser;

/* action name creator */
const reducerName = "users";
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName("FETCH_START");
const FETCH_SUCCESS = createActionName("FETCH_SUCCESS");
const FETCH_ERROR = createActionName("FETCH_ERROR");
const FETCH_LOGGED_USER = createActionName("FETCH_LOGGED_USER");

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const fetchLoggedUser = (payload) => ({
  payload,
  type: FETCH_LOGGED_USER,
});

/* thunk creators */
export const fetchUsers = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios.get(`${API_URL}/users`)
      .then((res) => {
        dispatch(fetchSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchLogged = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios.get(`${API_URL}/user/me`)
      .then((res) => {
        dispatch(fetchLoggedUser(res.data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_LOGGED_USER: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        loggedUser: {
          userName: action.payload.displayName,
          userEmail: action.payload.emails[0].value,
          avatar: action.payload.photos[0].value,
        },
      };
    }
    default:
      return statePart;
  }
};
