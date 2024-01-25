import { useState } from "react";

interface Props {
  textContents: string;
}

const Button = ({ textContents }: Props) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <>
      <button onClick={handleClick}>{textContents}</button>
    </>
  );
};

export default Button;
