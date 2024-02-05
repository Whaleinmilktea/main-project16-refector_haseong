import { HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 10px;
`;

interface Props {
  type: HTMLInputTypeAttribute | undefined;
  step?: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  autoComplete?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}

const Input = ({
  type,
  step,
  name,
  value,
  placeholder,
  autoComplete,
  onChange,
  required,
  disabled,
}: Props) => {
  if (placeholder == undefined) {
    placeholder = "";
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange != undefined) {
      onChange(e.currentTarget.value);
    }
  };

  return (
    <>
      <StyledInput
        type={type}
        step={step}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
      ></StyledInput>
    </>
  );
};

export default Input;
