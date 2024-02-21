import { css } from "@emotion/react";
import Image from "next/image";

export default function HomeContent() {
  return (
    <div css={Container}>
      <div css={Content}>
        <h1>Web Recruitment</h1>
        <p>국내 최초 웹 개발 채용 플랫폼</p>
        <p>당신을 위한 최신 채용 공고를 매일 업데이트하여 제공합니다.</p>
        <div css={Nav}>
          <div>
            <a href={"/saramin"}>
              <img
                src="https://www.saramincorp.co.kr/resources/image/og.png"
                alt="사람인"
              />
            </a>
          </div>
          <div>
            <a href={"/jobkorea"}>
              <img
                src="https://oopy.lazyrockets.com/api/rest/cdn/image/0821aa81-6c17-485e-98b4-9589a62e7ae2.png"
                alt="잡코리아"
              />
            </a>
          </div>
        </div>
      </div>
      <Image
        alt="banner"
        src="https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-52379.jpg"
        sizes="100vw"
        width={0}
        height={0}
        css={css`
          height: 100vh;
          width: 100vw;
        `}
      />
    </div>
  );
}

const Container = css`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Content = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.6);
  h1 {
    font-size: 30px;
    margin-bottom: 50px;
  }
  p:nth-of-type(1) {
    font-size: 50px;
    margin-bottom: 20px;
  }
  p:nth-of-type(2) {
    font-size: 20px;
    margin-bottom: 100px;
  }
  @media (max-width: 930px) {
    zoom: 0.7;
    p:nth-of-type(1) {
      line-height: 1.3;
    }
    p:nth-of-type(2) {
      font-size: 19px;
    }
  }
`;

const Nav = css`
  display: flex;
  justify-content: center;
  div {
    img {
      width: 250px;
      height: 150px;
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
    margin-right: 20px;
  }
`;
