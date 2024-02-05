import { useState } from "react";
import { CreatePostInterface } from "../../types/post";
import styled from "styled-components";
import Input from "../atoms/Input";
import TextEditor from "../atoms/text-editor";
import TagInput from "../atoms/tag-input";
import DaysOfWeek from "../atoms/daysofweek";

const CreatePost = () => {
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
    color: "",
  });

  const handleFormData = (
    field: string,
    value: string | string[] | number[]
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  console.log(formData);

  return (
    <Wrapper>
      <form>
        <Contents>
          <Input
            type="text"
            value={formData.title}
            onChange={(val) => handleFormData("title", val)}
          />
          <Input
            type="date"
            value={formData.startDate}
            onChange={(val) => handleFormData("startDate", val)}
          />
          <Input
            type="time"
            step="600"
            value={formData.startTime}
            onChange={(val) => handleFormData("startTime", val)}
          />
          <Input
            type="date"
            value={formData.endDate}
            onChange={(val) => handleFormData("endDate", val)}
          />
          <Input
            type="time"
            step="600"
            value={formData.endTime}
            onChange={(val) => handleFormData("endTime", val)}
          />
          <Input
            type="number"
            placeholder="최소인원"
            value={formData.memberMin}
            onChange={(val) => handleFormData("memberMin", val)}
          />
          <Input
            type="number"
            placeholder="최대인원"
            value={formData.memberMax}
            onChange={(val) => handleFormData("memberMax", val)}
          />
          <Input type="text" placeholder="스터디 진행 플랫폼 URL" />
          <DaysOfWeek
            value={formData.dayOfWeek}
            onClick={(val) => handleFormData("dayOfWeek", val)}
          />
          <TagInput onChange={(val) => handleFormData("tags", val)} />
        </Contents>
        <TextEditor onChange={(val) => handleFormData("introduction", val)} />
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
  grid-template-rows: repeat(6, 1fr) auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  input:nth-child(1) {
    grid-column: 1 / 3;
  }
`;
