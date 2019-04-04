import {
  customersUrl,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE
} from "../../../../constants";

import {
  FETCH_CUSTOMERS,
  CUSTOMER_DELETED,
  DELETE_CUSTOMER_FAILURE,
  CUSTOMER_CREATED
} from "./types";
import axios from "axios";
import { onActionToast } from "../../../../components/message_toast";
import { toast } from "react-toastify";
import { setupInterceptors } from "../../../../auth/SetupInterceptors";

setupInterceptors();

export function fetchCustomers() {
  return function(dispatch) {
    axios
      .get(`${customersUrl}`)
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
        onActionToast(
          error.message,
          { position: toast.POSITION.TOP_CENTER },
          ERROR_MESSAGE
        );
        dispatch(
          authError(DELETE_CUSTOMER_FAILURE, "Erro ao deletar cliente.")
        );
      });
  };
}

export function registerCustomer(data, callback) {
  console.log(data);

  return function(dispatch) {
    axios
      .post(`${customersUrl}`, retrieveCustomerData(data))
      .then(response => {
        dispatch({ type: CUSTOMER_CREATED, payload: response });
        onActionToast("Cliente cadastrado com sucesso.", {}, SUCCESS_MESSAGE);
        callback();
      })
      .catch(error => {
        onActionToast(
          error.message,
          { position: toast.POSITION.TOP_CENTER },
          ERROR_MESSAGE
        );
        dispatch(
          authError(DELETE_CUSTOMER_FAILURE, "Erro ao cadastrar cliente.")
        );
      });
  };
}

function retrieveCustomerData(data) {
  return {
    name: data.name,
    cpf: data.cpf,
    address: {
      postalCode: data.postalCode,
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
        number: data.phone[i],
        phoneType: data.phoneType[i]
      };
    })
  };
}

export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error
  };
}
