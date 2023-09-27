import { css } from "@emotion/react";
import Image from "next/image";

export default function Home() {
  return (
    <div
      css={css`
        text-align: center;
        h1 {
          margin-bottom: 100px;
          font-size: 24px;
          font-weight: bold;
        }
      `}
    >
      <h1>개발자 신입채용 공고 모음 사이트</h1>
      <Image
        alt="banner"
        src="https://ukcareguide.co.uk/media/choose-recruitment-agency-min.jpg"
        width={1000}
        height={400}
        css={css`
          border-radius: 10px;
        `}
      />
    </div>
  );
}
