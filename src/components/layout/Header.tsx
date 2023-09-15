import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
 
  return (
    <div>
      <Link href={"/about"}>헤더 영역</Link>
    </div>
  );
}
