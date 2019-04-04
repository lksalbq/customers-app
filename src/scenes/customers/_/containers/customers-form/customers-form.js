import React, { Component } from "react";
import {
  Button,
  Select,
  Input,
  Form,
  Icon,
  Row,
  Layout,
  Typography
} from "antd";
import { registerCustomer } from "../../actions";
import "./customer-form.css";
import { connect } from "react-redux";

const { Option } = Select;
const { Title } = Typography;
let id = 0;

class CustomersForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  componentDidMount() {
    this.add();
  }

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.registerCustomer(values, () => {
          this.props.history.push("/customers");
        });
      }
    });
  };

  handleCepSearch = e => {
    const value = e.target.value;
    // search cep
    console.log(value);
    // this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateCPF = (rule, value, callback) => {
    //validate cpf
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 4 }
      }
    };

    const phoneType = k =>
      getFieldDecorator(`phoneType[${k}]`, {
        initialValue: "RESIDENTIAL"
      })(
        <Select style={{ width: 120 }}>
          <Option value="RESIDENTIAL">Residencial</Option>
          <Option value="COMMERCIAL">Comercial</Option>
          <Option value="CELLPHONE">Celular</Option>
        </Select>
      );

    const federalState = getFieldDecorator("federalState", {
      initialValue: "DF"
    })(
      <Select style={{ width: 100 }}>
        <Option value="DF">DF</Option>
      </Select>
    );
    const { getFieldValue } = this.props.form;

    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");

    const formItemsPhones = keys.map((k, index) => (
      <Form.Item
        label={index === 0 ? "Telefones" : ""}
        key={k}
        required={true}
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
      >
        {getFieldDecorator(`phone[${k}]`, {
          rules: [
            {
              required: true,
              message: "Por favor, informe pelo menos um telefone!"
            }
          ]
        })(<Input addonBefore={phoneType(k)} />)}

        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));

    const { Content } = Layout;

    return (
      <Layout style={{ minHeight: "80vh" }}>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Row type="flex" justify="space-around" align="middle">
            <div
              style={{
                background: "#fff",
                padding: 10,
                borderRadius: "25px",
                width: "120vh"
              }}
            >
              <Title> Cadastro de Clientes </Title>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Nome">
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        max: 100,
                        min: 3,
                        message:
                          "Nome inválido: minimo 3 caráteres e máximo 100"
                      },
                      {
                        required: true,
                        message: "Por favor informe o seu nome"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="CPF">
                  {getFieldDecorator("cpf", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor informe o seu cpf!"
                      },
                      {
                        validator: this.validateCPF
                      }
                    ]
                  })(<Input type="text" />)}
                </Form.Item>
                <Form.Item label="CEP">
                  {getFieldDecorator("postalCode", {
                    rules: [
                      {
                        required: true,
                        message: "Informe o cep."
                      }
                    ]
                  })(<Input type="text" onBlur={this.handleCepSearch} />)}
                </Form.Item>
                <Form.Item label="Logradouro">
                  {getFieldDecorator("neighborhood", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor informe o logradouro."
                      }
                    ]
                  })(<Input type="text" />)}
                </Form.Item>
                <Form.Item label="Bairro">
                  {getFieldDecorator("district", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor informe o bairro."
                      }
                    ]
                  })(<Input type="text" />)}
                </Form.Item>
                <Form.Item label="Cidade">
                  {getFieldDecorator("city", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor informe a cidade e uf!"
                      }
                    ]
                  })(
                    <Input
                      addonAfter={federalState}
                      style={{ width: "100%" }}
                    />
                  )}
                </Form.Item>
                {formItemsPhones}
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={this.add}>
                    <Icon type="plus" /> Addicionar Telefones
                  </Button>
                </Form.Item>
                <Form.Item label="Email">
                  {getFieldDecorator("emails", {
                    rules: [
                      { required: true, message: "Please input your email!" }
                    ]
                  })(<Input style={{ width: "100%" }} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Row type="flex" align="middle" style={{ float: "right" }}>
                    <Button
                      type="default"
                      onClick={() => this.props.history.push("/customers")}
                    >
                      Voltar
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Cadastrar
                    </Button>
                  </Row>
                </Form.Item>
              </Form>
            </div>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default connect(
  null,
  { registerCustomer }
)(Form.create({ name: "register" })(CustomersForm));
