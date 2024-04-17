import { useRouter } from "next/router";
import useActiveSite from "./useActiveSite";

export default function useQuery() {
  const { query } = useRouter();
  const site = useActiveSite();
  const job = query.job || "frontend";
  const career = query.career || "junior";

  return { site, job, career };
}
