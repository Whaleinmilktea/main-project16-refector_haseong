import { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import styled from "styled-components";

interface PropsType {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewTagInput = ({ setTags }: PropsType) => {
  const [selected, setSelected] = useState<string[]>([]);
  setTags(selected);

  return (
    <TagInputWrapper>
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="tags"
        placeHolder="기술 스택을 입력해주세요"
      />
    </TagInputWrapper>
  );
};

const TagInputWrapper = styled.div`
  display: block;
`;

export default NewTagInput;