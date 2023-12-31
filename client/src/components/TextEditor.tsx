import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

type Props = {
  onFocus?: () => void;
  onBlur?: () => void;
  setIntroduction: React.Dispatch<React.SetStateAction<string>>;
  introduction: string;
};

function TextEditor({ onFocus, onBlur, setIntroduction, introduction }: Props) {
  const [text, setText] = useState(introduction);

  const handleOnChange = (_event: any, editor: ClassicEditor) => {
    const data = editor.getData();
    setText(data);
    setIntroduction(data);
  };

  return (
    <EditorContainer>
      <Editor>
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={handleOnChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </Editor>
    </EditorContainer>
  );
}

export default TextEditor;

const EditorContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Editor = styled.div`
  width: 100%;
  height: 500px;

  &:focus-within {
    box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
    border: 1px solid #59a4de;
    outline: none;
  }

  & {
    border: 1px solid hsl(210, 8%, 85%);
    border-radius: 3px;
    background-color: white;
  }

  .ck-icon:focus {
    border: none;
  }

  .ck-editor__main {
    width: 100%;
    margin: 0;
  }

  .ck-editor__editable {
    min-height: 210px;
    width: 100%;
  }

  .ck.ck-editor__editable:not(.ck-editor__nested-editable):focus {
    border: none;
    box-shadow: none;
  }

  .ck.ck-toolbar .ck.ck-toolbar__separator {
    background-color: white;
  }

  .ck {
    border: none;
  }
`;
