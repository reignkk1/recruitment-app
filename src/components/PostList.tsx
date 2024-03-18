import { css } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { IResult } from "@/pages/[[...path]]";
import { parserLocalStorage } from "parser-storages";

interface PostListProps {
  posts: IResult[];
}

export default function PostList({ posts }: PostListProps) {
  const [readed, setReaded] = useState<string[]>();

  const handelTitleClick = (postId: string) => {
    if (!readed?.includes(postId)) {
      parserLocalStorage.set("readed", [...(readed || []), postId]);
      setReaded(parserLocalStorage.get("readed"));
    }
  };

  useEffect(() => {
    setReaded(parserLocalStorage.get("readed"));
  }, []);

  return (
    <ul css={List}>
      {posts?.map((post) => (
        <li key={post.id} css={ListItem}>
          <div css={LeftContainer}>
            <Link href={post.company.link} target="_blank">
              {post.company.name}
            </Link>
          </div>
          <div css={MiddleContainer(readed, post.id)}>
            <Link
              href={post.link}
              target="_blank"
              onClick={() => handelTitleClick(post.id)}
            >
              {post.title}
            </Link>
            <div css={Etc}>{post.etc}</div>
          </div>
          <div css={RightContainer}>
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

const List = css``;

const ListItem = css`
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
`;

const Etc = css`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 30px;
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LeftContainer = css`
  margin-right: 150px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MiddleContainer = (readed?: string[], postId?: string) => css`
  width: 600px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  a {
    color: ${readed?.includes(postId || "") ? "rgba(0,0,0,0.4)" : "black"};
  }
`;

const RightContainer = css`
  width: 300px;
  div {
    font-size: 13px;
    margin-bottom: 8px;
  }
`;
