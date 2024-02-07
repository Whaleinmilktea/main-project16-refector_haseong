import { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import styled from "styled-components";

interface PropsType {
  onChange: (tags: string[]) => void;
}

const TagInputSearch = ({ onChange }: PropsType) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleTagChange = (tags: string[]) => {
    if (tags.length > 3) {
      alert("태그는 최대 3개까지 입력 가능합니다.");
      setSelected(tags.slice(0, 3));
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
        placeHolder="검색할 기술 스택을 3개까지 입력해주세요"
        beforeAddValidate={beforeAddValidate}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  margin-bottom: 10px;
  width: 100%;

  .rti--container {
    width: 100%;
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

export default TagInputSearch;
