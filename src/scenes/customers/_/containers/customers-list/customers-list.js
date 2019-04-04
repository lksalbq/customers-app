import React, { Component } from "react";
import { Layout, Table, Popconfirm, Icon, message } from "antd";

class CustomersList extends Component {
  columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) =>
        this.state.data.length >= 1 ? (
          <Popconfirm
            title="Tem certeza que deseja excluir？"
            icon={<Icon type="question-circle-o" style={{ color: "red" }} />}
            onConfirm={() => this.deleteCustomer(record.key)}
          >
            <a href="javascript:;">Excluir</a>
          </Popconfirm>
        ) : null
    }
  ];

  state = {
    data: [
      {
        key: 1,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description:
          "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
      },
      {
        key: 2,
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        description:
          "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park."
      },
      {
        key: 3,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        description:
          "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park."
      }
    ]
  };

  deleteCustomer = key => {
    const data = [...this.state.data];
    this.setState({ data: data.filter(item => item.key !== key) });
    message.success("Usuário excluido!");
  };

  render() {
    return (
      <Table
        columns={this.columns}
        expandedRowRender={record => (
          <p style={{ margin: 0 }}>{record.description}</p>
        )}
        dataSource={this.state.data}
      />
    );
  }
}

export default CustomersList;
