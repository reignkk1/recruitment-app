import Head from "next/head";
import Link from "next/link";
import { css } from "@emotion/react";
import { useState } from "react";
import useActiveSection from "@/utils/useActiveSection";
import { useEffect } from "react";

interface IData {
  data: {
    title: string;
    link: string;
    company: { name: string; link: string };
    workPlace: string;
    career: string;
    education: string;
    deadLines: string;
  }[];
}

export default function Content({ data }: IData) {
  const [posts, setPosts] = useState(data);

  const section = useActiveSection();

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const handelTitleClick = () => {
    // 클릭 시 흐리게
  };

  return (
    <>
      <Head>
        <title>{section}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul
        css={css`
          border-top: 1px solid black;
        `}
      >
        {posts.map((post, idx) => (
          <li
            key={idx}
            css={css`
              display: flex;
              justify-content: space-between;
              padding: 30px 10px;
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
              a {
                color: black;
                text-decoration: none;
                &:hover {
                  border-bottom: 1px solid black;
                }
              }
            `}
          >
            <div
              css={css`
                margin-right: 150px;
                width: 150px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              `}
            >
              <Link href={post.company.link} target="_blank">
                {post.company.name}
              </Link>
            </div>
            <div
              onClick={() => handelTitleClick()}
              css={css`
                width: 800px;
                font-weight: bold;
              `}
            >
              <Link href={post.link} target="_blank">
                {post.title}
              </Link>
            </div>
            <div
              css={css`
                width: 300px;
                div {
                  font-size: 13px;
                  margin-bottom: 8px;
                }
              `}
            >
              <div>{post.workPlace}</div>
              <div>{post.career}</div>
              <div>{post.education}</div>
              <div>{post.deadLines}</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
