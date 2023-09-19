import { useRouter } from "next/router";

export default function useActiveSection() {
  const { asPath } = useRouter();
  if (asPath.startsWith("/saramin")) {
    return "사람인";
  } else if (asPath.startsWith("/jobkorea")) {
    return "잡코리아";
  } else if (asPath === "/") {
    return "홈";
  }
}
