import useActiveSection from "@/hooks/useActiveSite";
import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface PaginationProps {
  total: number;
}

export default function Pagination({ total }: PaginationProps) {
  const section = useActiveSection();
  const pageTotal = Math.ceil(total / 20);
  const numbers = Array.from({ length: pageTotal }, (_, pageNumber) =>
    String(pageNumber + 1)
  );
  const {
    query: { job = "frontend", career = "junior", page = "1" },
    push,
  } = useRouter();
  const pageNumbers = numbers.slice(
    0 + 10 * (Math.ceil(Number(page) / 10) - 1),
    10 * Math.ceil(Number(page) / 10)
  );

  const activePrevButton = !pageNumbers.includes(numbers[0]);
  const activeNextButton = !pageNumbers.includes(numbers[numbers.length - 1]);

  const getLinkPageButton = (pageNumber: string) => {
    return `/${section}?job=${job}&career=${career}&page=${pageNumber}`;
  };

  const handleClickNext = () => {
    push(getLinkPageButton(String(Number(pageNumbers?.slice(-1)) + 1)));
  };

  const handleClickPrev = () => {
    push(getLinkPageButton(String(Number(pageNumbers?.slice(0, 1)) - 1)));
  };

  const pageButtons = pageNumbers?.map((pageNumber) => {
    const active = pageNumber === page;
    return (
      <li key={pageNumber} css={ListItem(active)}>
        <Link href={getLinkPageButton(pageNumber)}>{pageNumber}</Link>
      </li>
    );
  });

  const prevButton = activePrevButton && (
    <button onClick={handleClickPrev} css={Button}>{`< 이전`}</button>
  );

  const nextButton = activeNextButton && (
    <button onClick={handleClickNext} css={Button}>{`다음 >`}</button>
  );

  return (
    <div css={Container}>
      {prevButton}
      <ul css={List}>{pageButtons}</ul>
      {nextButton}
    </div>
  );
}

const Container = css`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const List = css`
  display: flex;
  margin: 0px 20px;
`;

const ListItem = (active: boolean) => css`
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: black;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    margin-right: 5px;
    background-color: ${active ? "#eaedf4" : "none"};
    border: ${active ? "1px solid black" : "none"};
    cursor: pointer;
    &:hover {
      background-color: #eaedf4;
    }
    opacity: 0.7;
  }
`;

const Button = css`
  border: none;
  background-color: white;
  border-radius: 5px;
  &:hover {
    background-color: #eaedf4;
  }
  cursor: pointer;
`;
