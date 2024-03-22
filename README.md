# Recruitment-app

<a target='_blank' href='https://recruitment-dev.vercel.app/'>[🌍 배포 링크]</a>

## 프로젝트 시작하게 된 이유

- 주기적으로 올라오는 개발자 채용공고를 한눈에 보기 위해서 제작하였습니다.
- Next.js의 동적 라우팅 기능과 서버 사이드 렌더링, 정적 HTML 파일 생성을 학습하였습니다.

## 실행 방법

1. `git clone`
2. `npm install`
3. `npm run dev`

## Next.js 란?

서버 사이드 렌더링, 정적 웹 페이지 생성 등 리액트 기반 웹 어플리케이션 기능들을 가능하게 하는 Node.js 위에서 빌드된 오픈 소스 웹 개발 프레임 워크이다. 리액트 공식 문서에서는 Next.js를 '권고하는 툴체인들' 중 하나로 언급하며 개발자들이 Node.js로 서버 렌더링되는 웹 사이트를 빌드할 때의 해결책의 하나로 말하고 있다.

Next.js는 Vercel에서 만든 오픈 소스이고 개발을 유지하고 주도하고있다.

## Next.js의 등장 배경

현재 대부분의 웹 사이트들은 CSR(Client Side Rendering)이 가능한 SPA(Single Page Application)으로 만들어진다.
SPA를 만들기 위해 등장한 것이 흔히 3대장으로 일컫는 React, Angular, Vue와 같은 라이브러리 및 프레임워크이다.
하지만 이런 CSR + SPA 방식에도 문제가 발생하기 시작한다.

- 초기 로딩이 느리다.
- 페이지 캐싱이 잘 안된다.
- SEO(검색 엔진 최적화)가 잘 안된다.

이러한 문제들을 해결하기 위해서 CSR과 SSR의 장점만을 모은 Vercel의 Next.js가 등장하게 되었다.

## Next.js의 장점

Next.js는 Page 기반의 라우팅 시스템을 제공한다.
`Page`라는 디렉토리 안에 라우팅될 파일을 생성하면 파일명과 매핑되어 알아서 라우팅이 된다.
SSR, SSG를 지원하고 다양한 옵션을 제공한다.
`getStaticProps`,`getStaticPaths`,`getServerSideProps` 등과 같은 API를 제공함으로서 특정 페이지를 CSR로 처리할지 SSR로 처리할 것인지 페이지의 특성에 맞게 개발자가 선택해서 개발 할 수 있도록 도와준다.

## 단점

SSR을 사용할 때 서버 리소스가 필요하므로 서버 비용이 증가 할 수 있다.

## Project Stack

- Next.js
- TypeScript
- Emotion
- Cheerio
