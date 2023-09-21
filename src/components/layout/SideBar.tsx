import Link from "next/link";
import { css } from "@emotion/react";
import useActiveSection from "@/utils/useActiveSection";

export default function SideBar() {
  const sidBarMenu = [
    {
      name: "홈",
      link: "/",
      src: "https://cdn-icons-png.flaticon.com/512/63/63988.png",
    },
    {
      name: "사람인",
      link: "/saramin",
      src: "https://www.saramin.co.kr/favicon.ico?ver=2",
    },
    {
      name: "잡코리아",
      link: "/jobkorea",
      src: "https://www.jobkorea.co.kr/favicon.ico?202309191400",
    },
  ];

  const section = useActiveSection();

  return (
    <nav
      css={css`
        width: 100px;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        background-color: white;
        position: fixed;
        height: 100%;
        padding: 10px 5px;
        li {
          border-radius: 10px;
          padding: 5px 8px;
          margin-bottom: 15px;

          a {
            display: flex;
            align-items: center;
            font-weight: bold;
            color: black;
          }
        }
        img {
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
      `}
    >
      <ul>
        {sidBarMenu.map((menu, i) => (
          <li
            key={i}
            css={css`
              background-color: ${menu.name === section
                ? "rgba(0,0,0,0.1)"
                : "none"};
            `}
          >
            <Link href={menu.link}>
              <img src={menu.src} />
              <div>{menu.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
