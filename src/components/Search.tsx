import {
  SelectorDataContext,
  SelectorModalContext,
  SelectorValueContext,
} from "@/context";
import {
  useCreateModalState,
  useCreateOptionsState,
  useCreateValueState,
  useModal,
  useSelectorData,
  useValue,
} from "@/hooks";
import { CheckBoxProps } from "@/types";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { FormEvent } from "react";

import selectorsData from "../selectorsData.json";

export default function Search() {
  const { Container } = SearchStyles;
  const { data: selectors } = selectorsData;

  const modalStateController = useCreateModalState(selectors);
  const valueStateController = useCreateValueState(selectors);

  return (
    <SelectorModalContext.Provider value={modalStateController}>
      <SelectorValueContext.Provider value={valueStateController}>
        <div css={Container}>
          {selectors.map((selector, index) => (
            <SelectorDataContext.Provider value={selector} key={index}>
              <Selector />
            </SelectorDataContext.Provider>
          ))}
        </div>
      </SelectorValueContext.Provider>
    </SelectorModalContext.Provider>
  );
}

function Selector() {
  const { Container, Label } = SelectorStyles;
  const { id, title } = useSelectorData();
  const { modal, openModal } = useModal();
  const { value } = useValue();
  const isModal = modal[id];

  const onClick = () => {
    openModal(id);
  };

  return (
    <div css={Container}>
      <div onClick={onClick} css={Label}>
        {title + " | " + value[id]}
      </div>
      {isModal && <Modal />}
    </div>
  );
}

function Modal() {
  const { Container } = ModalStyles;
  const { title } = useSelectorData();
  return (
    <div css={Container}>
      <div>{title}</div>
      <ModalForm />
    </div>
  );
}

function ModalForm() {
  const { Button } = ModalFormStyles;
  const { push } = useRouter();
  const { value, setValue } = useValue();
  const { options, id } = useSelectorData();
  const { closeAllModal } = useModal();
  const categoryValue = value[id];

  const { option, setOption, initialState } = useCreateOptionsState(
    options,
    categoryValue
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trueValueIndex = Object.values(option).findIndex(
      (value) => value === true
    );
    const trueValueKey = Object.keys(option)[trueValueIndex];

    setValue((prev) => {
      let params = "";
      let queryString: string[] = [];
      const resultValue = { ...prev, [id]: trueValueKey };
      Object.entries(resultValue).forEach(([key, value]) => {
        if (key === "section") {
          params = value;
        } else {
          queryString.push(`${key}=${value}`);
        }
      });

      push(`/${params}?${queryString.join("&")}&page=1`);
      closeAllModal();
      return resultValue;
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {options.map(({ value, text }, index) => {
        return (
          <CheckBox
            key={index}
            id={index + ""}
            onChange={() => setOption({ ...initialState, [value]: true })}
            checked={option[value]}
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
