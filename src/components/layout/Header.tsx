import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@/styles/Header.module.css";

export default function Header() {
  return (
    <div className={styled.header_container}>
      <Link href={"/about"}>헤더 영역</Link>
    </div>
  );
}
