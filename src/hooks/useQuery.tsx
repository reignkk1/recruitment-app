import { useRouter } from "next/router";
import useActiveSite from "./useActiveSite";

/**
 *
 * @returns 현재 URI 파라미터 또는 쿼리스트링 데이터를 각각 리턴한다.
 */

export default function useQuery() {
  const { query } = useRouter();
  const site = useActiveSite();
  const job = query.job || "frontend";
  const career = query.career || "junior";

  if (!site) {
    throw new Error("site가 존재하지 않습니다.");
  }

  return { site, job, career };
}
