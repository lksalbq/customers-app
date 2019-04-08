import React, { Component } from "react";
import { fetchCustomers } from "./_/actions";
import CustomersList from "./_/containers/customers-list/customers-list";
import { Layout, Row, Button, Col, Typography } from "antd";
import { connect } from "react-redux";

const { Title } = Typography;

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customersList: [],
      pagination: {}
    };
  }

  goToRegister = () => {
    this.props.history.push("/customers/register");
  };

  componentDidMount() {
    this.props.fetchCustomers(0);
  }

  componentWillReceiveProps(props) {
    this.setState({
      customersList: props.customersList,
      pagination: props.pagination
    });
  }

  render() {
    const { Content } = Layout;
    return (
      <Layout style={{ minHeight: "80vh" }}>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Row type="flex" justify="space-around" align="middle">
            <div
              style={{
                background: "#fff",
                padding: 24,
                borderRadius: "25px",
                width: "120vh"
              }}
            >
              <Title> Clientes </Title>
              <Col span={8} offset={12} />
              <div>
                <Button
                  type="primary"
                  icon="user-add"
                  onClick={this.goToRegister}
                >
                  Cadastrar Cliente
                </Button>
              </div>
              <Col>
                {this.state.customersList.length > 0 && (
                  <CustomersList
                    customersList={this.state.customersList}
                    pagination={this.state.pagination}
                  />
                )}
              </Col>
            </div>
          </Row>
        </Content>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    customersList: state.customers.customersList,
    pagination: state.customers.pagination
  };
}

export default connect(
  mapStateToProps,
  { fetchCustomers }
)(Customers);
