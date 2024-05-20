import { SelectorDataContext, SelectorModalContext } from "@/context";
import {
  useCreateModal,
  useCreateOptions,
  useModal,
  useQuery,
  useSelectorData,
} from "@/hooks";
import { SelectorData } from "@/types";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { FormEvent } from "react";

interface CheckBoxProps {
  onChange: () => void;
  text: string;
  checked: boolean;
  id: string;
}

export default function Search() {
  const { Container } = SearchStyles;

  const selectorData: SelectorData[] = [
    {
      categoryId: "section",
      label: `채용 사이트`,
      modalTitle: "채용 사이트",
      options: [
        { id: "saramin", text: "사람인" },
        { id: "jobkorea", text: "잡코리아" },
      ],
    },
    {
      categoryId: "job",
      label: `개발`,
      modalTitle: "개발",
      options: [
        { id: "frontend", text: "프론트엔드" },
        { id: "backend", text: "백엔드" },
      ],
    },
    {
      categoryId: "career",
      label: `경력`,
      modalTitle: "경력",
      options: [
        { id: "junior", text: "신입" },
        { id: "senior", text: "1년 이상" },
      ],
    },
  ];

  const modalState = useCreateModal(selectorData);

  return (
    <div css={Container}>
      {selectorData.map((data, index) => (
        <SelectorDataContext.Provider value={data} key={data.categoryId}>
          <SelectorModalContext.Provider value={modalState}>
            <Selector />
          </SelectorModalContext.Provider>
        </SelectorDataContext.Provider>
      ))}
    </div>
  );
}

function Selector() {
  const { Container, Label } = SelectorStyles;
  const { categoryId, label } = useSelectorData();
  const { modal, openModal } = useModal();
  const query = useQuery();
  const category = query[categoryId];

  const isModal = modal[categoryId];

  const onClick = () => {
    openModal(categoryId);
  };

  return (
    <div css={Container}>
      <div onClick={onClick} css={Label}>
        {label + " | " + category}
      </div>
      {isModal && <Modal />}
    </div>
  );
}

function Modal() {
  const { Container } = ModalStyles;
  const { modalTitle } = useSelectorData();
  return (
    <div css={Container}>
      <div>{modalTitle}</div>
      <ModalForm />
    </div>
  );
}

function ModalForm() {
  const { Button } = ModalFormStyles;
  const { asPath, push, replace } = useRouter();

  const { options, categoryId } = useSelectorData();
  const { closeAllModal } = useModal();
  const query = useQuery();
  const categoryValue = query[categoryId];
  const { option, setOption, initialState } = useCreateOptions(
    options,
    categoryValue
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trueValueIndex = Object.values(option).findIndex(
      (value) => value === true
    );
    const keyValueTrue = Object.keys(option)[trueValueIndex];
    const cleanedPath = asPath.split(/[?]/);
    const queryString = cleanedPath[1];

    console.log(asPath);

    if (categoryId === "section") {
      if (!queryString) {
        window.location.assign(`/${keyValueTrue}`);
      } else {
        window.location.assign(`/${keyValueTrue}?${queryString}`);
      }
    } else if (!queryString) {
      push(`?${categoryId}=${keyValueTrue}`);
    } else {
      const queryStringArray = queryString.split("&");
      const currentCategoryIndex = queryStringArray.findIndex((string) =>
        string.includes(categoryId)
      );
      queryStringArray.splice(
        currentCategoryIndex,
        1,
        `${categoryId}=${keyValueTrue}`
      );
      push(`/${query.section}?${queryStringArray.join("&")}`);
    }
    closeAllModal();
  };

  //

  return (
    <form onSubmit={handleSubmit}>
      {options.map(({ id, text }) => {
        return (
          <CheckBox
            key={id}
            id={id}
            onChange={() => setOption({ ...initialState, [id]: true })}
            checked={option[id]}
            text={text}
          />
        );
      })}
      <button css={Button}>완료</button>
    </form>
  );
}

function CheckBox({ id, onChange, checked, text }: CheckBoxProps) {
  const { Container } = CheckBoxStyles;

  return (
    <div css={Container}>
      <input id={id} type="checkbox" onChange={onChange} checked={checked} />
      <label htmlFor={id}>{text}</label>
    </div>
  );
}

const SearchStyles = {
  Container: css`
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
  `,
};

const SelectorStyles = {
  Container: css`
    position: relative;
  `,
  Label: css`
    width: 200px;
    margin-right: 50px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    padding: 10px 20px;
    cursor: pointer;
  `,
};

const ModalStyles = {
  Container: css`
    position: absolute;
    top: 25px;
    left: 10px;
    margin-top: 15px;
    margin-right: 20px;
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
  `,
};

const ModalFormStyles = {
  Button: css`
    background-color: #3f83f8;
    outline: none;
    padding: 5px 15px;
    width: 100%;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  `,
};

const CheckBoxStyles = {
  Container: css`
    &:hover {
      background-color: rgba(118, 118, 118, 0.1);
    }
  `,
};
