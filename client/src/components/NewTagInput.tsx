import { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import styled from "styled-components";

interface PropsType {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewTagInput = ({ setTags }: PropsType) => {
  const [selected, setSelected] = useState<string[]>([]);
  if(selected.length > 3) {
    alert("태그는 최대 3개까지 입력 가능합니다.");
    setSelected(selected.slice(0, 3));
  }
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