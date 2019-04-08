import React, { Component } from "react";
import { Table, Popconfirm, Icon, List, Avatar, Row, Col, Button } from "antd";
import { fetchCustomers, deleteCustomer } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class CustomersList extends Component {
  constructor() {
    super();

    this.state = {
      customersList: [],
      isLoading: true,
      pagination: {},
      current: 0
    };
  }

  componentDidMount() {
    if (this.props.customersList) {
      this.setState({ isLoading: false });
      this.setState({ pagination: this.props.pagination });
    }
  }

  loadClient = id => {
    this.props.history.push(`/customers/${id}/edit`);
  };

  fetchNextCustomersPage = pageNumber => {
    this.props.fetchCustomers(pageNumber);
    this.setState({ current: pageNumber });
  };

  columns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "CPF", dataIndex: "cpf", key: "cpf" },
    {
      title: "Ação",
      render: record =>
        this.props.customersList.length >= 1 ? (
          <div>
            <Button
              type="default"
              icon="edit"
              onClick={() => this.loadClient(record.id)}
            >
              Editar
            </Button>
            <Popconfirm
              title="Tem certeza que deseja excluir？"
              icon={<Icon type="question-circle-o" style={{ color: "red" }} />}
              onConfirm={() => this.deleteCustomer(record.id)}
            >
              <Button type="danger" icon="delete">
                Excluir
              </Button>
            </Popconfirm>
          </div>
        ) : null
    }
  ];

  renderAddress = address => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={address}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar icon="home" style={{ backgroundColor: "#2980b9" }} />
              }
              title={`${item.city} - ${item.federalState}`}
              description={`${item.neighborhood}, ${item.district} - 
              ${item.postalCode} - ${item.complement ? item.complement : ""}`}
            />
          </List.Item>
        )}
      />
    );
  };

  renderPhones = phones => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={phones}
        renderItem={phone => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar icon="phone" style={{ backgroundColor: "#2980b9" }} />
              }
              title={phone.number}
              description={this.renderPhoneType(phone.phoneType)}
            />
          </List.Item>
        )}
      />
    );
  };

  renderEmails = emails => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={emails}
        renderItem={email => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar icon="mail" style={{ backgroundColor: "#2980b9" }} />
              }
              title={email.address}
              description={""}
            />
          </List.Item>
        )}
      />
    );
  };

  renderPhoneType = type => {
    switch (type) {
      case "CELLPHONE":
        return "Celular";
      case "RESIDENTIAL":
        return "Residencial";
      case "COMMERCIAL":
        return "Comercial";
      default:
        return "";
    }
  };

  deleteCustomer = id => {
    const customers = [...this.state.customersList];
    this.props.deleteCustomer(id);
    this.setState({
      customersList: customers.filter(customer => customer.id !== id)
    });
  };

  render() {
    return (
      <Table
        columns={this.columns}
        expandedRowRender={record => (
          <Row style={{ margin: 0 }}>
            <Col span={8}>
              <p>Endereço</p>
              {this.renderAddress([...[], record.address])}
            </Col>
            <Col span={8}>
              <p>Telefones</p>
              {this.renderPhones(record.phones)}
            </Col>
            <Col span={8}>
              <p>Emails</p>
              {this.renderEmails(record.emails)}
            </Col>
          </Row>
        )}
        dataSource={this.props.customersList}
        rowKey={record => record.id}
        loading={this.state.isLoading}
        locale={{ emptyText: "Nenhum cliente cadastrado." }}
        pagination={this.state.pagination}
        current={this.state.current}
        onChange={e => this.fetchNextCustomersPage(e.current - 1)}
      />
    );
  }
}

export default connect(
  null,
  { fetchCustomers, deleteCustomer }
)(withRouter(CustomersList));
