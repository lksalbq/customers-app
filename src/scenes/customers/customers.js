import React, { Component } from "react";

import CustomersList from "./_/containers/customers-list/customers-list";
import { Layout, Row, Button, Col, Typography } from "antd";

const { Title } = Typography;

class Customers extends Component {
  goToRegister = () => {
    this.props.history.push("/customers/register");
  };

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
                height: "60vh",
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
                <CustomersList />
              </Col>
            </div>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default Customers;
