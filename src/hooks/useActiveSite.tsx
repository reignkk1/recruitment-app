import { useRouter } from "next/router";

export default function useActiveSite() {
  const { asPath } = useRouter();
  const cleanedPath = asPath.split(/[\?\#]/)[0];

  if (cleanedPath === "/") {
    return "home";
  } else if (cleanedPath === "/saramin") {
    return "saramin";
  } else if (cleanedPath === "/jobkorea") {
    return "jobkorea";
  } else {
    return null;
  }
}
