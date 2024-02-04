import { useState } from "react";
import { CreatePostInterface } from "../../types/post";
import styled from "styled-components";
import Input from "../atoms/Input";

const CreatePost = () => {
  const [formData, setFormData] = useState<CreatePostInterface>({
    studyName: "",
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

  const handleFormData = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <>
      <div>스터디 생성 페이지</div>
      <PostForm>
        <Input type="text" />
        <Input type="date" />
        <Input type="time" step="600"/>
        <Input type="date" />
        <Input type="time" step="600"/>
        <Input type="number" placeholder="최소인원" />
        <Input type="number" placeholder="최대인원" />
        <Input type="text" placeholder="스터디 진행 플랫폼 URL" />
        <Input type="text" placeholder="태그" />
      </PostForm>
    </>
  );
};

export default CreatePost;

const PostForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  input:nth-child(1) {
    grid-column: 1 / 3;
  }
`;
