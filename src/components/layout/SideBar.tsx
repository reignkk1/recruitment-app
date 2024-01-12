import { css } from "@emotion/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SideBar() {
  const { asPath } = useRouter();
  const cleanedPath = asPath.split(/[\?\#]/)[0];

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

  const sideBarItem = sidBarMenu.map(({ link, src, name }, i) => (
    <li key={i} css={ListItem(link, cleanedPath)}>
      <a href={link}>
        <Image alt="menu" src={src} width={15} height={15} />
        <div>{name}</div>
      </a>
    </li>
  ));

  return (
    <nav css={Container}>
      <ul>{sideBarItem}</ul>
    </nav>
  );
}

const Container = css`
  width: 100px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  position: fixed;
  height: 100%;
  padding: 10px 5px;
`;

const ListItem = (menuLink: string, cleanedPath: string) => css`
  border-radius: 10px;
  padding: 5px 8px;
  margin-bottom: 15px;
  background-color: ${menuLink === cleanedPath ? "rgba(0,0,0,0.1)" : "none"};
  a {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: black;
  }
  img {
    margin-right: 5px;
  }
`;
