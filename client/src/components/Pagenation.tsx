import styled from "styled-components";
import { getPageArray } from "../utils/getPagesArray";
import { SetStateAction } from "react";

interface PagenationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>
}

const Pagenation = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PagenationProps) => {

  const pageArray = getPageArray(totalPages); // [1,2,3]

  const handlePageClick = (e : React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(e.currentTarget.value));
  }

  return (
    <PagenationWrapper>
      {pageArray.map((page) => (
        <PageButton
          key={page}
          onClick={handlePageClick}
          value={page}
          active={currentPage === page} // active 속성을 추가하여 currentPage와 일치하면 true를 전달
        >
          {page}
        </PageButton>
      ))}
    </PagenationWrapper>
  );
};

export default Pagenation;

const PagenationWrapper = styled.div`
  margin-top: 10px;
`;

const PageButton = styled.button<{ active: boolean }>`
  font-size: 14px;
  padding: 8px 12px;
  border: none;
  background-color: ${({ active }) => (active ? "#78C1F3" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  margin-right: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #9BE8D8;
  }
`;
