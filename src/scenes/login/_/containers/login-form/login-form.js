import React, { Component } from "react";
import { connect } from "react-redux";

import { signIn } from "../../actions";
import { Form, Icon, Input, Button } from "antd";
import { withRouter } from "react-router-dom";
import "./login-form.css";

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.signIn(values, () => {
          this.props.history.push("/customers");
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [
              { required: true, message: "Por favor, informe o usuário!" }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Usuário"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Por favor informe a senha!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Senha"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(
  null,
  { signIn }
)(Form.create({ name: "Login" })(withRouter(LoginForm)));
