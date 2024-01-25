import { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 10px;
`;

interface Props {
  type: string;
  placeholder?: string;
  autoComplete?: string;
  onChange?: (value: string) => void
  value?: string
  required?: true;
}

const Input = ({ type, placeholder, autoComplete, onChange, value, required }: Props) => {
  if (placeholder == undefined) {
    placeholder = "";
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.currentTarget.value
    if (onChange != undefined) {
      onChange(newVal)
    }
  };

  return (
    <>
      <StyledInput
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete={autoComplete}
        required={required}
      ></StyledInput>
    </>
  );
};

export default Input;
