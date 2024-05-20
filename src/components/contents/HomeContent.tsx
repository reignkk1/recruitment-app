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
              <Image
                width={250}
                height={150}
                src="https://www.saramincorp.co.kr/resources/image/og.png"
                alt="사람인"
              />
            </a>
          </div>
          <div>
            <a href={"/jobkorea"}>
              <Image
                width={250}
                height={150}
                src="https://oopy.lazyrockets.com/api/rest/cdn/image/0821aa81-6c17-485e-98b4-9589a62e7ae2.png"
                alt="잡코리아"
              />
            </a>
          </div>
        </div>
      </div>
      <div css={Effect}></div>
      <div css={Effect2}></div>
      <div css={Effect3}></div>
      <div css={Effect4}></div>
      <div css={[BubbleTemplate, Bubble]}></div>
      <div css={[BubbleTemplate, Bubble2]}></div>
      <div css={[BubbleTemplate, Bubble3]}></div>
      <div css={[BubbleTemplate, Bubble4]}></div>
      <Image
        alt="banner"
        src="https://www.aicareer.co.kr/_next/image?url=%2Fburn_overlay.png&w=1920&q=75"
        sizes="100vw"
        width={0}
        height={0}
        css={css`
          height: 100vh;
          width: 100vw;
          mix-blend-mode: color-burn;
        `}
      />
    </div>
  );
}

const BubbleTemplate = css`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  filter: blur(10px);
`;

const Bubble = css`
  width: 90px;
  height: 90px;
  left: 10%;
  animation: motion 15s linear infinite;
  @keyframes motion {
    0% {
      transform: translateY(1000px);
    } /* 처음 위치 */
    100% {
      transform: translateY(-500px);
    } /* 마지막 위치 */
  }
`;
const Bubble2 = css`
  width: 120px;
  height: 120px;
  left: 30%;
  animation: motion2 20s linear infinite;
  @keyframes motion2 {
    0% {
      transform: translateY(2200px);
    } /* 처음 위치 */
    100% {
      transform: translateY(-500px);
    } /* 마지막 위치 */
  }
`;
const Bubble3 = css`
  width: 50px;
  height: 50px;
  left: 50%;
  animation: motion3 15s linear infinite;
  @keyframes motion3 {
    0% {
      transform: translateY(800px);
    } /* 처음 위치 */
    100% {
      transform: translateY(-500px);
    } /* 마지막 위치 */
  }
`;
const Bubble4 = css`
  width: 80px;
  height: 80px;
  left: 90%;
  animation: motion4 15s linear infinite;
  @keyframes motion4 {
    0% {
      transform: translateY(900px);
    } /* 처음 위치 */
    100% {
      transform: translateY(-500px);
    } /* 마지막 위치 */
  }
`;

const Effect = css`
  width: 1040px;
  height: 700px;
  position: absolute;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #edddfa 0%,
    rgba(53, 66, 179, 0.35) 56.77%,
    rgba(193, 209, 237, 0.31) 100%
  );
  filter: blur(80px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const Effect2 = css`
  width: 500px;
  height: 369px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #ddfafa 0%,
    rgba(53, 119, 179, 0.3) 50%,
    rgba(193, 209, 237, 0) 100%
  );
  top: 50%;
  left: 50%;
  position: absolute;
  filter: blur(52px);
  transform: translate(50%, -70%);
  z-index: 1;
`;

const Effect3 = css`
  width: 500px;
  height: 369px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #ddfafa 0%,
    rgba(53, 119, 179, 0.3) 50%,
    rgba(193, 209, 237, 0) 100%
  );
  top: 50%;
  left: 50%;
  position: absolute;
  filter: blur(52px);
  transform: translate(-150%, -70%);
  z-index: 1;
`;

const Effect4 = css`
  width: 100vw;
  height: 100vh;
  position: absolute;
  opacity: 0.2;
  background-color: rgb(2 132 199);
`;

const Container = css`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: linear-gradient(180deg, #ebeff2 0%, #dae1e9 100%);
`;

const Content = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.6);
  z-index: 2;

  h1 {
    font-size: 30px;
    margin-bottom: 50px;
    font-weight: bold;
  }
  p:nth-of-type(1) {
    font-size: 50px;
    margin-bottom: 30px;
    font-weight: bold;
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
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
    margin-right: 20px;
  }
`;
