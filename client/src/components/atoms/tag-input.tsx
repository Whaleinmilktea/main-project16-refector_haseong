import { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import styled from "styled-components";

interface PropsType {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagInput = ({ setTags }: PropsType) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleTagChange = (tags: string[]) => {
    if (tags.length > 3) {
      alert("태그는 최대 3개까지 입력 가능합니다.");
      setSelected(tags.slice(0, 3));
    } else {
      setSelected(tags);
      setTags(tags);
    }
  };

  return (
    <Wrapper>
      <TagsInput
        value={selected}
        onChange={handleTagChange}
        name="tags"
        placeHolder="기술 스택을 입력해주세요"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
`;

export default TagInput;
