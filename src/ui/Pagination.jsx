/* eslint-disable react/prop-types */
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
/**
 * ? To implement pagination feature, we will need total numbers of items in display .
 * $ In our case, that value will be shown like {count} results.
 * ? Also, we will need the current page value which will be as global state and store in the url .
 * ? So we will retrieve by using useSearchParams hook.
 * ? Then we will have prev and next buttons, prev will decrease current page and next will increase it.
 * ! For that we will need arithmetic operations, dun forget to convert the value(currentPage) to number.
 * ? We also need to calculate totalPage value by dividing total number of items(count) by PAGE_SIZE.
 * ? Prev Button, if the current page is first page(currentPage === 1) then, we will disable the button and do nothing with current page value. If not increase current page value by 1.
 * ? Next Button, if the currentpage is last page(currentPage === totalPage) then, we will disable the button and do nothing with current page value. If not decrease current page value by 1.  
 * ? Then  we will stored in the url and reuse it.
 * ? 
 */
export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams()

  //! Dun forget to convert Number
  const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const totalPage = Math.ceil(count / PAGE_SIZE)

  const isLastPage = currentPage === totalPage
  const isFirstPage = currentPage === 1

  const nextPage = () => {
    const next = isLastPage ? currentPage : Number(currentPage) + 1
    searchParams.set('page', next)
    setSearchParams(searchParams)
  }
  const prevPage = () => {
    const prev = isFirstPage ? currentPage : Number(currentPage) - 1
    searchParams.set('page', prev)
    setSearchParams(searchParams)
  }

  if (totalPage <= 1) return null

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to <span>{isLastPage ? count : currentPage * PAGE_SIZE}</span> of <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={isFirstPage}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={nextPage} disabled={isLastPage}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  )
}

