import styled from "styled-components";

const StyledInput = styled.input`
  padding: 10px;
`;

interface Props {
  type: string;
  placeholder?: string;
  autoComplete?: string;
  onChange?: (value: string) => void
  required?: true;
}

const Input = ({ type, placeholder, autoComplete, onChange, required }: Props) => {

  if (placeholder == undefined) {
    placeholder = "";
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange != undefined) {
      onChange(e.currentTarget.value)
    }
  };

  return (
    <>
      <StyledInput
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete={autoComplete}
        required={required}
      ></StyledInput>
    </>
  );
};

export default Input;
