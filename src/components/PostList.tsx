import { css } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { IData } from "@/pages/[...path]";

interface PostListProps {
  posts?: IData[];
}

export default function PostList({ posts }: PostListProps) {
  const [readed, setReaded] = useState<string[]>();
  const getItem = () => {
    if (window) return JSON.parse(localStorage.getItem("readed") || "[]");
  };

  const handelTitleClick = (postId: string) => {
    if (!readed?.includes(postId)) {
      localStorage.setItem(
        "readed",
        JSON.stringify([...(readed || []), postId])
      );
      setReaded(getItem());
    }
  };

  useEffect(() => {
    setReaded(getItem());
  }, []);

  return (
    <ul
      css={css`
        border-top: 1px solid black;
      `}
    >
      {posts?.map((post) => (
        <li
          key={post.id}
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
            css={css`
              width: 600px;
              font-weight: bold;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              a {
                color: ${readed?.includes(post.id)
                  ? "rgba(0,0,0,0.4)"
                  : "black"};
              }
            `}
          >
            <Link
              href={post.link}
              target="_blank"
              onClick={() => handelTitleClick(post.id)}
            >
              {post.title}
            </Link>
            <div
              css={css`
                font-size: 12px;
                color: rgba(0, 0, 0, 0.5);
                margin-top: 30px;
                width: 400px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              `}
            >
              {post.etc}
            </div>
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
  );
}
