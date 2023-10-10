import { useRouter } from "next/router";

export default function useQuery() {
  const router = useRouter();
  const { page, path, job, career } = router.query;
  const section = path![0];
  return { page, section, job, career, router };
}
