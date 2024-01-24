import { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
`;

interface InputProps {
  type: string;
  placeholder?: string;
  autoComplete?: string;
  required?: true;
}

const Input = ({ type, placeholder, autoComplete, required }: InputProps) => {
  const [val, setVal] = useState("");

  if (placeholder == undefined) {
    placeholder = "";
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value);
  };

  return (
    <>
      <StyledInput
        type={type}
        value={val}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete={autoComplete}
        required={required}
      ></StyledInput>
    </>
  );
};

export default Input;
