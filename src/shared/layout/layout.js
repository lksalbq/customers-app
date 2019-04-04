import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./layout.css";
import { Layout } from "antd";
import { withRouter } from "react-router-dom";
const { Header, Footer, Content } = Layout;

const LayoutApp = props => ({
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header>Header</Header>
        <Content>
          {" "}
          <ToastContainer transition={Slide} />
          {props.children}
        </Content>
        <Footer style={{ textAlign: "center" }}>©2019</Footer>
      </Layout>
    );
  }
});

export default withRouter(LayoutApp);
