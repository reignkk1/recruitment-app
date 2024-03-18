import useActiveSection from "@/hooks/useActiveSection";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Search() {
  const [{ section, job, career }, setOpen] = useState({
    section: false,
    job: false,
    career: false,
  });

  const handleClickSection = () =>
    setOpen((prev) => {
      return { section: !prev.section, job: false, career: false };
    });
  const handleClickJob = () =>
    setOpen((prev) => {
      return { section: false, job: !prev.job, career: false };
    });
  const handleClickCareer = () =>
    setOpen((prev) => {
      return { section: false, job: false, career: !prev.career };
    });

  return (
    <div css={SearchHeader}>
      <SelectBox open={section} onClick={handleClickSection}>
        채용사이트 | 전체 ▼
      </SelectBox>
      <SelectBox open={job} onClick={handleClickJob}>
        개발직군 | 프론트엔드 ▼
      </SelectBox>
      <SelectBox open={career} onClick={handleClickCareer}>
        경력조건 | 신입 ▼
      </SelectBox>
    </div>
  );
}

const SearchHeader = css`
  height: 100px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

interface SelectBoxProps {
  children: React.ReactNode;
  open: boolean;
  onClick(): void;
}

function SelectBox({ children, open, onClick }: SelectBoxProps) {
  return (
    <div>
      <div onClick={onClick} css={SearchDiv}>
        {children}
      </div>
      {open && <SelectModal />}
    </div>
  );
}

function SelectModal() {
  return <div css={SelectDiv}></div>;
}

const SearchDiv = css`
  width: 200px;
  margin-right: 50px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 10px 20px;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
`;

const SelectDiv = css`
  position: absolute;
  margin-left: 20px;
  margin-top: 10px;
  width: 200px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
`;
