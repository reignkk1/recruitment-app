import useActiveSection from "@/hooks/useActiveSection";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface SearchState {
  job?: string | string[];
  career?: string | string[];
}

export default function Search() {
  const [search, setSearch] = useState<SearchState>();
  const section = useActiveSection();
  const {
    query: { job = "frontend", career = "junior" },
    push,
    asPath,
  } = useRouter();

  useEffect(() => {
    setSearch({
      job,
      career,
    });
  }, [asPath]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    push(`/${section}?job=${search?.job}&career=${search?.career}&page=1`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} css={Form}>
      <div>
        <div css={InputRadioContainer}>
          <InputRadio
            name="job"
            label="프론트엔드"
            value="frontend"
            checked={search?.job === "frontend"}
            onChange={handleChange}
          />
          <InputRadio
            name="job"
            label="백엔드"
            value="backend"
            checked={search?.job === "backend"}
            onChange={handleChange}
          />
        </div>
        <div>
          <InputRadio
            name="career"
            label="신입"
            value="junior"
            checked={search?.career === "junior"}
            onChange={handleChange}
          />
          <InputRadio
            name="career"
            label="경력"
            value="senior"
            checked={search?.career === "senior"}
            onChange={handleChange}
          />
        </div>
      </div>
      <button css={SearchButton}>검색</button>
    </form>
  );
}

const Form = css`
  display: flex;
  margin-bottom: 50px;
  input {
    margin-right: 10px;
  }
  label,
  input {
    cursor: pointer;
  }
`;

const SearchButton = css`
  margin-left: 10px;
  width: 50px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #5694ff;
  border: none;
`;

const InputRadioContainer = css`
  margin-bottom: 5px;
`;

interface InputRadioProps {
  label: string;
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  checked: boolean;
  name: string;
}

function InputRadio({
  name,
  label,
  value,
  onChange,
  checked,
}: InputRadioProps) {
  return (
    <>
      <label htmlFor={value}>{label}</label>
      <input
        id={value}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </>
  );
}
