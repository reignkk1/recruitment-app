import { css } from "@emotion/react";
import Image from "next/image";

export default function HomeContent() {
  return (
    <div css={Container}>
      <Image
        alt="banner"
        src="/home-banner.png"
        width={1000}
        height={500}
        css={css`
          border-radius: 10px;
        `}
      />
    </div>
  );
}

const Container = css`
  text-align: center;
  h1 {
    margin-bottom: 100px;
    font-size: 24px;
    font-weight: bold;
  }
`;
