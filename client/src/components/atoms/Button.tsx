import { useState } from "react";

interface Props {
  type? : "button" | "submit" | "reset" | undefined;
  textContent? : string;
}

const Button = ({ type, textContent }: Props) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <>
      <button type={type} onClick={handleClick}>{textContent}</button>
    </>
  );
};

export default Button;
