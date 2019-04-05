import {
  FETCH_CUSTOMERS,
  CUSTOMER_CREATED,
  LOAD_CUSTOMER
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      const customers = action.payload.content;
      const { totalElements } = action.payload;
      return {
        ...state,
        customersList: customers,
        pagination: {
          total: totalElements,
          pageSize: 5,
          hideOnSinglePage: true
        }
      };
    case CUSTOMER_CREATED:
      const customer = action.payload;
      const customersList = [...state.customersList, customer];
      return { ...state, customersList: customersList };
    case LOAD_CUSTOMER:
      return { ...state, customer: action.payload.data };
    default:
      return state;
  }
}
