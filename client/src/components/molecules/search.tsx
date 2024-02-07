import { useState } from "react";
import TagInputSearch from "../atoms/tag-input-search";
import styled from "styled-components";

const Search = () => {
  const [search, setSearch] = useState([] as string[]);

  console.log(search);

  return (
    <Wrapper>
      <TagInputSearch onChange={setSearch} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-bottom: 20px;
  border-bottom: 1px solid #e1e4e8;
`;

export default Search;
