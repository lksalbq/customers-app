import React, { Component } from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./layout.css";
import { Layout, Avatar, Row, Icon, Col, Dropdown, Menu } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signoutUser } from "../../scenes/login/_/actions";

class LayoutApp extends Component {
  menu = (
    <Menu
      onClick={() =>
        this.props.signoutUser(() => {
          this.props.history.push("/");
        })
      }
    >
      <Menu.Item>Sair</Menu.Item>
    </Menu>
  );
  render() {
    const { Header, Footer, Content } = Layout;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          {" "}
          {this.props.authenticated && (
            <Row type="flex" justify="space-around" align="middle">
              <Col span={6} offset={6}>
                <Avatar size={35} icon="user" />

                <Dropdown overlay={this.menu}>
                  <Icon
                    type="down"
                    style={{ color: "#FFF", fontSize: "14px" }}
                  />
                </Dropdown>
              </Col>
            </Row>
          )}
        </Header>
        <Content>
          {" "}
          <ToastContainer transition={Slide} />
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: "center" }}>©2019</Footer>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(
  mapStateToProps,
  { signoutUser }
)(withRouter(LayoutApp));
