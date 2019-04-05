import React, { Component } from "react";
import CustomersForm from "../customers-form";
import { connect } from "react-redux";
import { loadCustomer } from "../../actions";

class CustomersEdit extends Component {
  state = {
    customer: {}
  };
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.loadCustomer(id);
  }

  componentDidMount() {
    if (this.props.customer) {
      this.setState({ customer: this.props.customer });
    }
  }

  render() {
    return (
      <div>
        <CustomersForm customer={this.state.customer} typeMode="edit" />
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
)(CustomersEdit);
