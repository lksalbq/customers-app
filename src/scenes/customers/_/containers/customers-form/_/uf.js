import React, { forwardRef } from "react";
import { Select } from "antd";

const { Option } = Select;

const UF = forwardRef((props, ref) => {
  return (
    <Select style={{ width: 100 }} ref={ref}>
      <Option value="AC">AC</Option>
      <Option value="AL">AL</Option>
      <Option value="AP">AP</Option>
      <Option value="AM">AM</Option>
      <Option value="BA">BA</Option>
      <Option value="CE">CE</Option>
      <Option value="DF">DF</Option>
      <Option value="ES">ES</Option>
      <Option value="GO">GO</Option>
      <Option value="MA">MA</Option>
      <Option value="MT">MT</Option>
      <Option value="MS">MS</Option>
      <Option value="MG">MG</Option>
      <Option value="PA">PA</Option>
      <Option value="PB">PB</Option>
      <Option value="PR">PR</Option>
      <Option value="PE">PE</Option>
      <Option value="PI">PI</Option>
      <Option value="RJ">RJ</Option>
      <Option value="RN">RN</Option>
      <Option value="RS">RS</Option>
      <Option value="RO">RO</Option>
      <Option value="RR">RR</Option>
      <Option value="SC">SC</Option>
      <Option value="SP">SP</Option>
      <Option value="SE">SE</Option>
      <Option value="TO">TO</Option>
    </Select>
  );
});

export default UF;
