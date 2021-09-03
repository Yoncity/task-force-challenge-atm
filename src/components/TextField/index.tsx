import React from "react";
import "./index.scss";

type Props = {
  type: string;
  labelText: string;
  labelId?: string;
  formId?: string;
  name: string;
  onChange?: any;
  value: string;
  error?: boolean;
};

const TextField: React.FC<Props> = ({
  type,
  labelText,
  labelId,
  formId,
  name,
  onChange,
  value,
  error,
}) => (
  <label id={labelId} htmlFor={formId} className="input_label">
    <input
      type={type || "text"}
      id={formId}
      name={name}
      onChange={onChange}
      placeholder=""
      value={value}
      className={`${error ? "error" : ""}`}
    />
    <span className={`label ${error ? "error" : ""}`}>{labelText}</span>
  </label>
);

export default TextField;
