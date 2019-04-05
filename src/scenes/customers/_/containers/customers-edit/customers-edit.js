import React, { Component } from "react";
import CustomersForm from "../customers-form";
import { connect } from "react-redux";
import { loadCustomer } from "../../actions";
import { withRouter } from "react-router-dom";
class CustomersEdit extends Component {
  state = {
    customer: null
  };
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.loadCustomer(id);
  }

  componentWillReceiveProps(props) {
    const { id } = this.props.match.params;
    if (Number(id) === Number(props.customer.id)) {
      this.setState({ customer: props.customer });
    }
  }

  render() {
    const { customer } = this.state;
    return (
      <div>
        {customer && (
          <CustomersForm
            customerEdit={customer}
            typeMode="edit"
            history={this.props.history}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { customer: state.customers.customer };
}

export default connect(
  mapStateToProps,
  { loadCustomer }
)(withRouter(CustomersEdit));
