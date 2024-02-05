import React, { useEffect, useState } from "react";
import { CreatePostInterface } from "../../types/post";
import styled from "styled-components";
import Input from "../atoms/Input";
import TextEditor from "../atoms/text-editor";
import TagInput from "../atoms/tag-input";
import DaysOfWeek from "../atoms/daysofweek";
import ClassButton from "../atoms/class-button";
import { sanitizeInput } from "../../utils/xss-filter";
import { useDocMutation } from "../../hooks/useDocMutation";
import { createStudyGroup } from "../../apis/StudyGroupApi";
import Loading from "../atoms/loading";
import { useNavigate } from "react-router-dom";

interface Props {
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const CreatePost = ({ setColor }: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreatePostInterface>({
    title: "",
    startDate: "",
    endDate: "",
    dayOfWeek: [0, 0, 0, 0, 0, 0, 0],
    startTime: "10:00",
    endTime: "11:00",
    memberMin: 2,
    memberMax: 2,
    platform: "",
    introduction: "",
    tags: [],
  });
  const { mutate, isLoading, isError } = useDocMutation("posts", createStudyGroup);
  if (isError) {
    alert("스터디 그룹 생성에 실패했습니다.");
  }

  useEffect(() => {
    setColor(formData.tags[0]);
  }, [formData.tags]);

  const handleFormData = (
    field: string,
    value: string | string[] | number[]
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const createGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.memberMin > formData.memberMax) {
      alert("최소인원은 최대인원보다 작을 수 없습니다.");
      return;
    }
    if (!formData.dayOfWeek.includes(1)) {
      alert("요일을 선택해주세요");
    }
    else if (formData.tags.length === 0) {
      alert("태그를 입력해주세요");
    }
    else if (formData.introduction.length === 0) {
      alert("스터디 소개를 입력해주세요");
    }
    else if (sanitizeInput(formData.introduction)) {
      alert("XSS 공격이 감지되었습니다.");
    }
    else {
      mutate(formData);
      navigate("/");
    }
  };

  return (
    <Wrapper>
      {isLoading && <Loading />}
      <form onSubmit={createGroup}>
        <Contents>
          <Input
            type="text"
            name="title"
            placeholder="스터디 제목을 입력해주세요."
            value={formData.title}
            onChange={(val) => handleFormData("title", val)}
            required
          />
          <Input
            type="date"
            className="date"
            value={formData.startDate}
            onChange={(val) => handleFormData("startDate", val)}
            required
          />
          <Input
            type="time"
            step="600"
            className="time"
            value={formData.startTime}
            onChange={(val) => handleFormData("startTime", val)}
            required
          />
          <Input
            type="date"
            className="date"
            value={formData.endDate}
            onChange={(val) => handleFormData("endDate", val)}
            required
          />
          <Input
            type="time"
            step="600"
            className="time"
            value={formData.endTime}
            onChange={(val) => handleFormData("endTime", val)}
            required
          />
          <Input
            type="number"
            placeholder="최소인원"
            className="member"
            value={formData.memberMin}
            onChange={(val) => handleFormData("memberMin", val)}
            required
          />
          <Input
            type="number"
            placeholder="최대인원"
            className="member"
            value={formData.memberMax}
            onChange={(val) => handleFormData("memberMax", val)}
            required
          />
          <Input type="text" placeholder="스터디 진행 플랫폼 URL" required />
          <DaysOfWeek
            value={formData.dayOfWeek}
            onClick={(val) => handleFormData("dayOfWeek", val)}
          />
        </Contents>
        <TagInput onChange={(val) => handleFormData("tags", val)} />
        <TextEditor onChange={(val) => handleFormData("introduction", val)} />
        <BtnWrapper>
          <ClassButton textContent="스터디 만들기" />
        </BtnWrapper>
      </form>
    </Wrapper>
  );
};

export default CreatePost;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Contents = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr) auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  width: 100%;
  height: 100%;

  select:hover,
  input:hover,
  ul:hover {
    transform: scale(1.05); /* Hover 시 요소를 확대 */
  }

  [name="title"] {
    grid-column: 1 / 3;
    border: none;
    background-color: transparent;
    font-size: 1.25rem;
    border-bottom: 1px solid #ccc;
    ::placeholder {
      font-size: 1.25rem;
      color: #d8d3d3;
    }
  }

  .date {
    border: none;
    background-color: transparent;
    border-bottom: 1px solid #ccc;
  }

  .time {
    border: none;
    background-color: transparent;
    border-bottom: 1px solid #ccc;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
