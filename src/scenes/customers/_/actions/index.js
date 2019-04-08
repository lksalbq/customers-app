import {
  customersUrl,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE
} from "../../../../constants";

import {
  FETCH_CUSTOMERS,
  CUSTOMER_DELETED,
  DELETE_CUSTOMER_FAILURE,
  CUSTOMER_CREATED,
  LOAD_CUSTOMER,
  LOAD_ERROR,
  CUSTOMER_UPDATED,
  EDIT_CUSTOMER_FAILURE
} from "./types";
import axios from "axios";
import { onActionToast } from "../../../../components/message_toast";
import { toast } from "react-toastify";
import { setupInterceptors } from "../../../../auth/SetupInterceptors";

setupInterceptors();

export function fetchCustomers(page) {
  return function(dispatch) {
    axios
      .get(`${customersUrl}?page=${page}`)
      .then(response => {
        dispatch({ type: FETCH_CUSTOMERS, payload: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function deleteCustomer(id) {
  return function(dispatch) {
    axios
      .delete(`${customersUrl}/${id}`)
      .then(response => {
        dispatch({ type: CUSTOMER_DELETED });
        onActionToast("Cliente excluido com sucesso.", {}, SUCCESS_MESSAGE);
      })
      .catch(error => {
        if (error.response.data.status === 403) {
          onActionToast(
            "Você não tem permissão para realizar essa ação",
            { position: toast.POSITION.TOP_CENTER },
            ERROR_MESSAGE
          );
        } else {
          onActionToast(
            error.message,
            { position: toast.POSITION.TOP_CENTER },
            ERROR_MESSAGE
          );
        }
        dispatch(
          authError(DELETE_CUSTOMER_FAILURE, "Erro ao deletar cliente.")
        );
      });
  };
}

export function registerCustomer(data, callback) {
  return function(dispatch) {
    axios
      .post(`${customersUrl}`, retrieveCustomerData(data))
      .then(response => {
        dispatch({ type: CUSTOMER_CREATED, payload: response });
        onActionToast("Cliente cadastrado com sucesso.", {}, SUCCESS_MESSAGE);
        callback();
      })
      .catch(error => {
        if (error.response.data.status === 403) {
          onActionToast(
            "Você não tem permissão para realizar essa ação",
            { position: toast.POSITION.TOP_CENTER },
            ERROR_MESSAGE
          );
          dispatch(
            authError(DELETE_CUSTOMER_FAILURE, "Erro ao cadastrar cliente.")
          );
        } else {
          onActionToast(
            error.message,
            { position: toast.POSITION.TOP_CENTER },
            ERROR_MESSAGE
          );
          dispatch(
            authError(DELETE_CUSTOMER_FAILURE, "Erro ao cadastrar cliente.")
          );
        }
      });
  };
}

export function editCustomer(data, id, callback) {
  return function(dispatch) {
    axios
      .put(`${customersUrl}/${id}`, retrieveCustomerData(data))
      .then(response => {
        dispatch({ type: CUSTOMER_UPDATED, payload: response });
        onActionToast("Cliente editado com sucesso.", {}, SUCCESS_MESSAGE);
        callback();
      })
      .catch(error => {
        if (error.response.data.status === 403) {
          onActionToast(
            "Você não tem permissão para realizar essa ação",
            { position: toast.POSITION.TOP_CENTER },
            ERROR_MESSAGE
          );
          dispatch(authError(EDIT_CUSTOMER_FAILURE, "Erro ao editar cliente."));
        } else {
          onActionToast(
            error.message,
            { position: toast.POSITION.TOP_CENTER },
            ERROR_MESSAGE
          );
          dispatch(authError(EDIT_CUSTOMER_FAILURE, "Erro ao editar cliente."));
        }
      });
  };
}

function retrieveCustomerData(data) {
  return {
    name: data.name,
    cpf: data.cpf
      .replace(/[^0-9]/, "")
      .replace(".", "")
      .replace("-", ""),
    address: {
      postalCode: data.postalCode.replace(/[^0-9]/, "").replace("-", ""),
      district: data.district,
      neighborhood: data.neighborhood,
      city: data.city,
      federalState: data.federalState,
      complement: data.complement
    },
    emails: data.keysEmails.map(i => {
      return {
        address: data.email[i]
      };
    }),
    phones: data.keysPhones.map(i => {
      return {
        number: data.phone[i]
          .replace(/[^0-9]/, "")
          .replace("(", "")
          .replace(")", "")
          .replace("-", ""),
        phoneType: data.phoneType[i]
      };
    })
  };
}

export function loadCustomer(id) {
  return function(dispatch) {
    axios
      .get(`${customersUrl}/${id}`)
      .then(response => {
        dispatch({ type: LOAD_CUSTOMER, payload: response });
      })
      .catch(error => {
        dispatch(authError(LOAD_ERROR));
      });
  };
}

export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error
  };
}
