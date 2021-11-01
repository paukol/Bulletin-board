import Axios from "axios";
import { API_URL } from "../config";
/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getOne = ({ posts }) => posts.onePost;
export const getPostById = ({ posts }, _id) => {
  return posts.data.filter((post) => post._id === _id)[0];
};
export const getLoadingState = ({ posts }) => posts.loading;

/* action name creator */
const reducerName = "posts";
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName("FETCH_START");
const FETCH_SUCCESS = createActionName("FETCH_SUCCESS");
const FETCH_ERROR = createActionName("FETCH_ERROR");
const ADD_POST = createActionName("ADD_POST");
const EDIT_POST = createActionName("EDIT_POST");
const FETCH_ONE_POST = createActionName("FETCH_ONE_POST");

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const addPost = (payload) => ({ payload, type: ADD_POST });
export const editPost = (payload) => ({ payload, type: EDIT_POST });
export const fetchOnePost = (payload) => ({ payload, type: FETCH_ONE_POST });

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    const { posts } = getState();

    if (posts.data.length === 0 || posts.loading.active === "false") {
      dispatch(fetchStarted());
      Axios.get(`${API_URL}/posts`)
        .then((res) => {
          dispatch(fetchSuccess(res.data));
        })
        .catch((err) => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchUserPosts = () => {
  return (dispatch, getState) => {
    const { posts } = getState();

    if (posts.data.length === 0 || posts.loading.active === "false") {
      dispatch(fetchStarted());
      Axios.get(`${API_URL}/yourposts`)
        .then((res) => {
          dispatch(fetchSuccess(res.data));
        })
        .catch((err) => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchOnePostFromAPI = (_id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios.get(`${API_URL}/posts/${_id}`)
      .then((res) => {
        dispatch(fetchOnePost(res.data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};
export const addPostRequest = (data) => {
  return (dispatch) => {
    dispatch(fetchStarted());

    Axios.post(`${API_URL}/posts/add`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        dispatch(addPost(data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const editPostRequest = (data, id) => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    Axios.put(`${API_URL}/posts/${id}/edit`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        dispatch(editPost(data));
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
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    case EDIT_POST: {
      return {
        ...statePart,
        data: [
          ...statePart.data.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
        ],
      };
    }
    case FETCH_ONE_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        onePost: action.payload,
      };
    }
    default:
      return statePart;
  }
};
