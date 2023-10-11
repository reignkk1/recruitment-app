import useQuery from "@/utils/useQuery";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Search() {
  const [job, setJob] = useState<"backend" | "frontend">("frontend");
  const [career, setareer] = useState<"junior" | "senior">("junior");

  const { router, section } = useQuery();

  useEffect(() => {
    setJob("frontend");
    setareer("junior");
  }, [section]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/${section}?job=${job}&career=${career}&page=1`);
  };

  const handleJobChange = (e: ChangeEvent<HTMLInputElement>) =>
    setJob(e.target.value as "backend" | "frontend");

  const handleCareerChange = (e: ChangeEvent<HTMLInputElement>) =>
    setareer(e.target.value as "junior" | "senior");

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <InputRadio
          label="프론트엔드"
          value="frontend"
          checked={job === "frontend"}
          onChange={handleJobChange}
        />
        <InputRadio
          label="백엔드"
          value="backend"
          checked={job === "backend"}
          onChange={handleJobChange}
        />
      </div>
      <div>
        <InputRadio
          label="신입"
          value="junior"
          checked={career === "junior"}
          onChange={handleCareerChange}
        />
        <InputRadio
          label="경력"
          value="senior"
          checked={career === "senior"}
          onChange={handleCareerChange}
        />
      </div>
      <button>검색</button>
    </form>
  );
}

interface InputRadioProps {
  label: string;
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  checked: boolean;
}

function InputRadio({ label, value, onChange, checked }: InputRadioProps) {
  return (
    <>
      <label htmlFor={value}>{label}</label>
      <input
        id={value}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </>
  );
}
