import { CheckedContext, QueryContext } from "@/context";
import useChecked from "@/hooks/useChecked";
import useModal from "@/hooks/useModal";
import useQuery from "@/hooks/useQuery";
import {
  convertCareerString,
  convertJobString,
  convertSiteString,
} from "@/utils";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from "react";

interface SelecterCategoryProps {
  label: string;
  onClick: () => void;
  isModal: boolean;
}

interface SelecterProps {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}

interface SelectModalProps {
  open: boolean;
  children: ReactNode;
}

interface SelectOptionProps {
  children: string;
  id: string;
}

interface SelectTitleProps {
  children: ReactNode;
}

export default function Search() {
  const [isModal, openModal] = useModal();
  const { site, job, career } = useQuery();

  const siteLabel = `채용 사이트 | ${site}`;
  const jobLabel = `개발 | ${job}`;
  const careerLabel = `경력 | ${career}`;

  const openSiteModal = () => openModal("site");
  const openJobModal = () => openModal("job");
  const openCareerModal = () => openModal("career");

  return (
    <div css={SearchHeader}>
      <SelecterSite
        label={siteLabel}
        isModal={isModal.site}
        onClick={openSiteModal}
      />
      <SelecterJob
        label={jobLabel}
        isModal={isModal.job}
        onClick={openJobModal}
      />
      <SelecterCareer
        label={careerLabel}
        isModal={isModal.career}
        onClick={openCareerModal}
      />
    </div>
  );
}

function SelecterSite({ label, onClick, isModal }: SelecterCategoryProps) {
  return (
    <Selecter label={label} onClick={onClick}>
      <Selecter.modal open={isModal}>
        <Selecter.title>채용 사이트</Selecter.title>
        <Selecter.option id="saramin">사람인</Selecter.option>
        <Selecter.option id="jobkorea">잡코리아</Selecter.option>
      </Selecter.modal>
    </Selecter>
  );
}
function SelecterJob({ label, onClick, isModal }: SelecterCategoryProps) {
  return (
    <Selecter label={label} onClick={onClick}>
      <Selecter.modal open={isModal}>
        <Selecter.title>개발</Selecter.title>
        <Selecter.option id="frontend">프론트엔드</Selecter.option>
        <Selecter.option id="backend">백엔드</Selecter.option>
      </Selecter.modal>
    </Selecter>
  );
}
function SelecterCareer({ label, onClick, isModal }: SelecterCategoryProps) {
  return (
    <Selecter label={label} onClick={onClick}>
      <Selecter.modal open={isModal}>
        <Selecter.title>경력</Selecter.title>
        <Selecter.option id="junior">신입</Selecter.option>
        <Selecter.option id="senior">1년 이상</Selecter.option>
      </Selecter.modal>
    </Selecter>
  );
}

function Selecter({ children, onClick, label }: SelecterProps) {
  return (
    <div>
      <div onClick={onClick} css={SelectBar}>
        {label}
      </div>
      {children}
    </div>
  );
}

Selecter.title = function SelectTitle({ children }: SelectTitleProps) {
  return <div>{children}</div>;
};

Selecter.modal = function SelectModal({ children, open }: SelectModalProps) {
  const [checkedId, setCheckedId] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("gd");
  };

  if (!open) return null;

  return (
    <CheckedContext.Provider value={{ checkedId, setCheckedId }}>
      <div css={SelectDiv}>
        <form onSubmit={handleSubmit}>
          {children}
          <button css={SelectButton}>완료</button>
        </form>
      </div>
    </CheckedContext.Provider>
  );
};

Selecter.option = function SelectOption({ children, id }: SelectOptionProps) {
  const [checkedId, setCheckedId] = useChecked();

  const onChange = () => {
    setCheckedId(id);
  };

  return (
    <div css={SelectOptionContainer}>
      <input
        id={id}
        type="checkbox"
        onChange={onChange}
        checked={checkedId === id}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

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
  user-select: none;
`;

const SelectBar = css`
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

const SelectOptionContainer = css`
  &:hover {
    background-color: rgba(118, 118, 118, 0.1);
  }
`;
