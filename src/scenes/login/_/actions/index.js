import axios from "axios";
import { setupInterceptors } from "../../../../auth/SetupInterceptors";

import ability from "./../../../../ability";
import { toast } from "react-toastify";
import { AUTH_USER, AUTH_FAILURE, UNAUTH_USER } from "./types/index";
import { onActionToast } from "../../../../components/message_toast";
import { ERROR_MESSAGE, SUCCESS_MESSAGE, authUrl } from "../../../../constants";

/**
 * Error helper
 */
export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error
  };
}

export function signIn(values, callback) {
  setupInterceptors();
  return function(dispatch) {
    axios
      .post(`${authUrl}/signin`, values)
      .then(response => {
        dispatch({ type: AUTH_USER, payload: response.data });
        onActionToast("Usuário logado com sucesso.", {}, SUCCESS_MESSAGE);
        // ability.update(response.data.rules);
        callback();
      })
      .catch(error => {
        if (error.response !== undefined && error.response.data !== undefined) {
          ability.update([]);
          dispatch(authError(AUTH_FAILURE, ""));
          onActionToast(
            "Erro ao realizar login, usuário ou senha inválidos.",
            { position: toast.POSITION.TOP_CENTER },
            ERROR_MESSAGE
          );
        } else {
          ability.update([]);
          onActionToast(
            "Erro ao realizar login.",
            { position: toast.POSITION.TOP_CENTER },
            ERROR_MESSAGE
          );
          dispatch(authError(AUTH_FAILURE, "Erro ao realizar login."));
        }
      });
  };
}

export function verifyToken(callback) {
  setupInterceptors();
  const token = localStorage.getItem("accessToken");

  return function(dispatch) {
    if (!token) {
      dispatch({ type: AUTH_FAILURE });
      ability.update([]);
      callback();
    } else {
      axios
        .post(`${authUrl}/validate_token`, { token: token })
        .then(response => {
          dispatch({ type: AUTH_USER });
          console.log(response);
          callback();
        })
        .catch(error => {
          if (error.response !== undefined) {
            if (
              error.response.status === 401 ||
              error.response.status === 500
            ) {
              dispatch({ type: AUTH_FAILURE });
              ability.update([]);
              callback();
            }
          } else {
            dispatch({ type: AUTH_FAILURE });
            ability.update([]);
            onActionToast(
              "Faça login.",
              { position: toast.POSITION.TOP_CENTER },
              ERROR_MESSAGE
            );
            callback();
          }
        });
    }
  };
}

/**
 * Sign out
 */
export function signoutUser(callback) {
  return function(dispatch) {
    localStorage.clear("accessToken");
    localStorage.clear("tokenType");
    ability.update([]);
    dispatch({ type: UNAUTH_USER });
    if (callback) {
      callback();
      onActionToast("Usuário deslogado com sucesso", {}, SUCCESS_MESSAGE);
    }
  };
}
