export const initialState = {
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
    onePost: {},
  },
  users: {
    data: [],
    loggedUser: {},
  },
  user: {
    active: true,
  },
};
