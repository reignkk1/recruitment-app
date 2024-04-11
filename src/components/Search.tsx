import { CategoryContext, CheckedContext } from "@/context";
import useActiveSection from "@/hooks/useActiveSection";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { Children, FormEvent, ReactNode, useContext, useState } from "react";

export default function Search() {
  const { query } = useRouter();
  const section = (query.path || [])[0];
  const job = query.job || "frontend";
  const career = query.career || "junior";

  const convertJobString = () => {
    if (job === "frontend") {
      return "프론트엔드";
    } else if (job === "jobkorea") {
      return "잡코리아";
    } else {
      return "알수없음";
    }
  };

  const convertSectionString = () => {
    if (section === "saramin") {
      return "사람인";
    } else if (section === "jobkorea") {
      return "잡코리아";
    } else {
      return "알수없음";
    }
  };

  const convertCareerString = () => {
    if (career === "junior") {
      return "신입";
    } else if (career === "senior") {
      return "경력";
    } else {
      return "알수없음";
    }
  };

  const category = useState<"site" | "job" | "career" | null>(null);

  return (
    <div css={SearchHeader}>
      <CategoryContext.Provider value={category}>
        <SelectSite />
      </CategoryContext.Provider>
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

function SelectSite() {
  const [category, setCategory] = useContext(CategoryContext);

  const { query } = useRouter();
  const section = (query.path || [])[0];
  const isOpen = category === "site";

  return (
    <SelectBox
      label={`채용사이트 | ${section}`}
      onClick={() => setCategory((prev) => (prev === "site" ? null : "site"))}
    >
      <SelectModal open={isOpen}>
        <SelectTitle>채용 사이트</SelectTitle>
        <SelectOption id="1">사람인</SelectOption>
        <SelectOption id="2">잡코리아</SelectOption>
      </SelectModal>
    </SelectBox>
  );
}

// selectOption 컴포넌트 children을 id로

interface SelectBoxProps {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}

function SelectBox({ children, onClick, label }: SelectBoxProps) {
  return (
    <div>
      <div onClick={onClick} css={SearchDiv}>
        {label}
      </div>
      {children}
    </div>
  );
}

function SelectModal({
  children,
  open,
}: {
  open: boolean;
  children: ReactNode;
}) {
  const checked = useState<string>();

  // element 왜 접근 못하는지?

  // Children.forEach(children,(element,i)=>{
  //   console.log(element.props.children)
  // })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (!open) return null;

  return (
    <CheckedContext.Provider value={checked}>
      <div css={SelectDiv}>
        <form onSubmit={handleSubmit}>
          {children}
          <button css={SelectButton}>완료</button>
        </form>
      </div>
    </CheckedContext.Provider>
  );
}

function SelectTitle({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

function SelectOption({ children, id }: { children: string; id: string }) {
  const [checked, setChecked] = useContext<any>(CheckedContext);

  return (
    <div css={SelectOptionContainer}>
      <input
        id={id}
        type="checkbox"
        checked={checked === children}
        onClick={() => setChecked(children)}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}

const SelectOptionContainer = css`
  &:hover {
    background-color: rgba(118, 118, 118, 0.1);
  }
`;

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
  margin-top: 5px;
  margin-left: 10px;
  width: 200px;
  height: 130px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
  div {
    margin-bottom: 8px;
  }
  form label {
    display: block;
    width: 100%;
    cursor: pointer;
  }
  form div {
    display: flex;
    padding: 5px;
    border-radius: 5px;
  }
`;

const SelectButton = css`
  background-color: #3f83f8;
  outline: none;
  padding: 5px 15px;
  width: 100%;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;
