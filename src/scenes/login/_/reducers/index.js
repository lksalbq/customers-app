import {
  AUTH_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
  NOT_AUTHORIZED
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_FAILURE:
      return {
        ...state,
        authenticated: false
      };
    case AUTH_USER:
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case NOT_AUTHORIZED:
      return { ...state, not_authorized: action.payload };
    default:
      return state;
  }
}
