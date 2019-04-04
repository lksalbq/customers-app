import React, { Component } from "react";

import CustomersList from "./_/containers/customers-list/customers-list";
import { Layout, Row } from "antd";

class Customers extends Component {
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
                height: "80vh",
                width: "120vh"
              }}
            >
              <CustomersList />
            </div>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default Customers;
