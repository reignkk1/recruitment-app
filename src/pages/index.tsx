import { css } from "@emotion/react";

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
      <h1>신입채용 공고 모음 사이트</h1>
      <img
        src="https://ukcareguide.co.uk/media/choose-recruitment-agency-min.jpg"
        css={css`
          width: 1000px;
          border-radius: 10px;
        `}
      />
    </div>
  );
}
