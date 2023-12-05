import Link from "next/link";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

export default function PageButtons() {
  const router = useRouter();

  const { page = "1", job = "frontend", career = "junior" } = router.query;

  const path = router.query.path || "";

  const prev_URI = `/${path[0]}?job=${job}&career=${career}&page=${
    Number(page) - 1
  }`;
  const next_URI = `/${path[0]}?job=${job}&career=${career}&page=${
    Number(page) + 1
  }`;

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
      {page !== "1" ? <Link href={prev_URI}>◀ 이전 페이지 </Link> : <div></div>}

      <Link href={next_URI}>다음 페이지 ▶</Link>
    </div>
  );
}
