import { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import styled from "styled-components";

interface PropsType {
  onChange: (tags: string[]) => void;
}

const TagInput = ({ onChange }: PropsType) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleTagChange = (tags: string[]) => {
    if (tags.length > 2) {
      alert("태그는 최대 2개까지 입력 가능합니다.");
      setSelected(tags.slice(0, 2));
    } else {
      setSelected(tags);
    }
  };

  function containsOnlyEnglish(text: string) {
    const englishRegex = /^[a-zA-Z\s]*$/;
    return englishRegex.test(text);
  }

  const beforeAddValidate = (text: string) => {
    if (!containsOnlyEnglish(text)) {
      alert("태그는 영어로만 입력 가능합니다.");
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <Wrapper>
      <TagsInput
        value={selected}
        onChange={handleTagChange}
        name="tags"
        placeHolder="기술 스택을 입력해주세요."
        beforeAddValidate={beforeAddValidate}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  margin-bottom: 10px;
  input:nth-child(1) {
    border: none;
    background-color: transparent;
    font-size: 0.75rem;
    border-bottom: none;
    ::placeholder {
      font-size: 0.75rem;
      color: #d8d3d3;
    }
  }
  .rti--tag {
    height: 10%;
    span {
      font-size: 0.75rem;
    }
    button {
      font-size: 0.75rem;
    }
  }
  .rti--input {
    font-size: 0.75rem;
  }
`;

export default TagInput;
