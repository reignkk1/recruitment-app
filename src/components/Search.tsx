import useQuery from "@/utils/useQuery";
import { css } from "@emotion/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface SearchState {
  job: "backend" | "frontend";
  career: "junior" | "senior";
}

export default function Search() {
  const [{ job, career }, setState] = useState<SearchState>({
    job: "frontend",
    career: "junior",
  });

  const { router, section } = useQuery();

  useEffect(() => {
    setState({
      job: "frontend",
      career: "junior",
    });
  }, [section]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/${section}?job=${job}&career=${career}&page=1`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      css={css`
        display: flex;
        margin-bottom: 50px;
        input {
          margin-right: 10px;
        }
        label,
        input {
          cursor: pointer;
        }
      `}
    >
      <div>
        <div
          css={css`
            margin-bottom: 5px;
          `}
        >
          <InputRadio
            name="job"
            label="프론트엔드"
            value="frontend"
            checked={job === "frontend"}
            onChange={handleChange}
          />
          <InputRadio
            name="job"
            label="백엔드"
            value="backend"
            checked={job === "backend"}
            onChange={handleChange}
          />
        </div>
        <div>
          <InputRadio
            name="career"
            label="신입"
            value="junior"
            checked={career === "junior"}
            onChange={handleChange}
          />
          <InputRadio
            name="career"
            label="경력"
            value="senior"
            checked={career === "senior"}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        css={css`
          margin-left: 10px;
          width: 50px;
          border-radius: 5px;
          cursor: pointer;
          background-color: #5694ff;
          border: none;
        `}
      >
        검색
      </button>
    </form>
  );
}

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
