import Link from "next/link";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

export default function PageButtons() {
  const { page, path } = useRouter().query;
  const section = path![0];

  return (
    <div
      css={css`
        width: 500px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        font-size: 20px;
        a {
          color: black;
          &:hover {
            color: #3f83f8;
          }
        }
      `}
    >
      {page && page !== "1" ? (
        <Link href={`/${section}?page=${Number(page) - 1}`}>
          ◀ 이전 페이지{" "}
        </Link>
      ) : (
        <div></div>
      )}

      <Link href={`/${section}?page=${page ? Number(page) + 1 : 2}`}>
        다음 페이지 ▶
      </Link>
    </div>
  );
}
