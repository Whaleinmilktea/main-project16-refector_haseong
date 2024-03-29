import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";

type Props = {
  onFocus?: () => void;
  onBlur?: () => void;
  onChange: (value: string) => void;
};

function TextEditor({ onFocus, onBlur, onChange }: Props) {
  const [text, setText] = useState("");

  const handleOnChange = (_event: any, editor: ClassicEditor) => {
    const data = editor.getData();
    setText(data);
  };

  useEffect(() => {
    onChange(text);
  }, [text]);

  return (
    <Wrapper>
      <Editor>
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={handleOnChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </Editor>
    </Wrapper>
  );
}

export default TextEditor;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Editor = styled.div`
  width: 100%;
  height: 700px;

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
