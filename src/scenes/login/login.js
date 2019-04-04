import React from "react";
import LoginForm from "./_/containers/login-form";

import { Layout, Row, Typography, Icon } from "antd";

export default class Login extends React.Component {
  render() {
    const { Content } = Layout;
    const { Title } = Typography;
    return (
      <Layout style={{ minHeight: "50vh" }}>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Row type="flex" justify="space-around" align="middle">
            <div
              style={{
                background: "#fff",
                padding: 24,
                borderRadius: "25px",
                height: "30vh",
                width: "50vh"
              }}
            >
              <Title style={{ padding: 2, textAlign: "center" }}>
                Login <Icon type="login" />
              </Title>

              <LoginForm />
            </div>
          </Row>
        </Content>
      </Layout>
    );
  }
}
