import styled from "styled-components";

interface ListFilterProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ListFilter = ({ onChange }: ListFilterProps) => {
  return (
    <ListFilterContainer>
      <select name="listFilter" onChange={onChange}>
        <option value="default">등록순</option>
        <option value="koAlpabetical">가나다순</option>
        <option value="views">조회수 높은 순</option>
        <option value="likes">좋아요 높은 순</option>
      </select>
    </ListFilterContainer>
  );
};

const ListFilterContainer = styled.div`
  select {
    width: 100px;
    height: 30px;
    padding: 2px 3px;
    border: 1px solid #ccc; /* 회색 계열 테두리 추가 */
    border-radius: 3px;
    background-color: #fff; /* 배경색 흰색으로 설정 */
    color: #333; /* 폰트 색상 어두운 회색으로 설정 */
    font-size: 14px;
  }
`;

export default ListFilter;
