import styled from "styled-components";

const Search = () => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      alert("Enter 키를 클릭하셨습니다. 검색 기능은 현재 준비중입니다.");
      return;
    }
  };


  return (
    <SearchContainer>
      <form>
      <SearchInput type="text" placeholder="서비스 준비중입니다" onKeyDown={handleKeyPress}/>
      </form>
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  display: flex;
  height: 30px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc; /* 밑줄 스타일 추가 */
  font-size: 14px;
  color: #333;
  flex: 1;
  margin-right: 8px;
  background-color: transparent; /* 배경색 투명으로 설정 */
  outline: none; /* 포커스 시 브라우저 기본 스타일 제거 */
`;
