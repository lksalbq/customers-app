import { FETCH_CUSTOMERS, CUSTOMER_CREATED } from "../actions/types";

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
    default:
      return state;
  }
}
