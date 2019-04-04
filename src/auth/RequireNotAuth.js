import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { verifyToken, signoutUser } from "../scenes/login/_/actions";
import { Spin } from "antd";

export default function(ComposedComponent) {
  class NotAuthentication extends Component {
    constructor(props) {
      super(props);
      this.state = {
        is_authenticated: false
      };
    }

    componentDidMount() {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        if (this.state.is_authenticated !== false) {
          this.setState({ is_authenticated: false });
        }

        this.props.signoutUser(null);
      } else {
        this.props.verifyToken(() => {
          if (this.props.authenticated) {
            this.setState({ is_authenticated: true });
            this.props.history.push("/customers");
          } else {
            this.setState({ is_authenticated: true });
          }
        });
      }
    }

    render() {
      if (this.props.authenticated === undefined) {
        return (
          <div className="spin">
            <Spin tip="Carregando..." />;
          </div>
        );
      }
      return <ComposedComponent {...this.props} />;
    }
  }

  NotAuthentication.propTypes = { authenticated: PropTypes.bool };

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    };
  }

  return connect(
    mapStateToProps,
    { verifyToken, signoutUser }
  )(NotAuthentication);
}
