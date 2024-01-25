import { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 10px;
`;

interface Props {
  type: string;
  placeholder?: string;
  autoComplete?: string;
  required?: true;
}

const Input = ({ type, placeholder, autoComplete, required }: Props) => {
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
