import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { verifyToken } from "../scenes/login/_/actions";
import { Spin } from "antd";

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillReceiveProps(props) {
      if (!props.authenticated) {
        this.props.verifyToken(() => {
          this.setState({ is_authenticated: false });
          this.props.history.push("/");
        });
      }
    }

    componentDidMount() {
      this.props.verifyToken(() => {
        if (!this.props.authenticated) {
          this.setState({ is_authenticated: false });
          this.props.history.push("/");
        }
      });
    }

    render() {
      if (!this.props.authenticated) {
        return (
          <div className="spin">
            <Spin tip="Carregando..." />;
          </div>
        );
      }

      return this.props.authenticated && <ComposedComponent {...this.props} />;
    }
  }

  Authentication.propTypes = { authenticated: PropTypes.bool };

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      authorized: state.auth.authorized
    };
  }

  return connect(
    mapStateToProps,
    { verifyToken }
  )(Authentication);
}
