import useActiveSection from "@/hooks/useActiveSection";
import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PaginationProps {
  total: number;
}

export default function Pagination({ total }: PaginationProps) {
  const section = useActiveSection();
  const pageTotal = Math.ceil(total / 20);
  const numbers = Array.from({ length: pageTotal }, (_, pageNumber) =>
    String(pageNumber + 1)
  );
  // 초기값 slice(0,10)
  const [pageNumbers, setPageNumbers] = useState<string[]>();

  const {
    query: { job = "frontend", career = "junior", page = "1" },
    push,
  } = useRouter();

  const getLinkPageButton = (pageNumber: string) => {
    return `/${section}?job=${job}&career=${career}&page=${pageNumber}`;
  };

  useEffect(() => {
    setPageNumbers(
      numbers.slice(
        0 + 10 * (Math.ceil(Number(page) / 10) - 1),
        10 * Math.ceil(Number(page) / 10)
      )
    );
  }, [page]);

  const pageButtons = pageNumbers?.map((pageNumber) => {
    const active = pageNumber === (page || "1");
    return (
      <li key={pageNumber} css={ListItem(active)}>
        <Link href={getLinkPageButton(pageNumber)}>{pageNumber}</Link>
      </li>
    );
  });

  // 이전, 다음 버튼 생겼다 사라졌다 구현
  const handleClickNext = () => {
    push(getLinkPageButton(String(Number(pageNumbers?.slice(-1)) + 1)));
  };

  const handleClickPrev = () => {
    push(getLinkPageButton(String(Number(pageNumbers?.slice(0, 1)) - 1)));
  };

  return (
    <div css={Container}>
      <button onClick={handleClickPrev} css={Button}>{`< 이전`}</button>
      <ul css={List}>{pageButtons}</ul>
      <button onClick={handleClickNext} css={Button}>{`다음 >`}</button>
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
