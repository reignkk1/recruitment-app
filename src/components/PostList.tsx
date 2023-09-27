import Link from "next/link";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PageButtons from "./PageButtons";

interface IData {
  id: string;
  title: string;
  link: string;
  company: { name: string; link: string };
  workPlace: string;
  career: string;
  education: string;
  etc: string;
  deadLines: string;
}

interface IContent {
  data: IData[];
}

export default function PostList({ data }: IContent) {
  const [posts, setPosts] = useState<IData[]>();
  const [readed, setReaded] = useState<string[]>();
  const [loading, setLoading] = useState(false);

  const { page, path } = useRouter().query;
  const section = path![0];

  const getItem = () => {
    if (window) return JSON.parse(localStorage.getItem("readed") || "[]");
  };

  const pageChangeFetch = async () => {
    if (Number(page)) {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section}?page=${page}`
      );
      setLoading(false);
      setPosts(data);
    }
  };

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    pageChangeFetch();
    setReaded(getItem());
  }, [page]);

  const handelTitleClick = (postId: string) => {
    if (!readed?.includes(postId)) {
      localStorage.setItem(
        "readed",
        JSON.stringify([...(readed || []), postId])
      );
      setReaded(getItem());
    }
  };

  if (loading) {
    return (
      <div
        css={css`
          font-size: 28px;
          font-weight: bold;
          text-align: center;
        `}
      >
        🛠️크롤링 중..
      </div>
    );
  }

  return (
    <>
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
      <PageButtons />
    </>
  );
}
