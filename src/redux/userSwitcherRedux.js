/* selectors */
export const getStatus = ({ user }) => user.active;

/* action name creator */
const reducerName = "userSwitcher";
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const GET_USER_STATUS = createActionName("GET_USER_STATUS");

/* action creators */
export const getUserStatus = (payload) => ({ payload, type: GET_USER_STATUS });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case GET_USER_STATUS: {
      return {
        ...statePart,
        active: action.payload,
      };
    }
    default:
      return statePart;
  }
};
