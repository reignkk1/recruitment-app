import { SelectorDataContext, SelectorModalContext } from "@/context";
import {
  useCreateModalState,
  useCreateOptionsState,
  useModal,
  useGetSelectorData,
  useQuery,
} from "@/hooks";
import { CheckBoxProps } from "@/types";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef } from "react";
import selectorsData from "../selectorsData.json";
import { getKeyRelevantValue } from "@/utils";

export default function Search() {
  const { Container } = SearchStyles;
  const { data } = selectorsData;

  // 데이터를 기반으로 Modal 상태와 Value 값 상태를 만든다.
  const modalStateController = useCreateModalState(data);

  return (
    // 하위 컴포넌트들이 데이터에 쉽게 접근할 수 있게 Context를 만든다.
    <SelectorModalContext.Provider value={modalStateController}>
      <div css={Container}>
        {data.map((selectorData, index) => (
          // 각각의 데이터를 가져와서 Selector를 UI에 그린다.
          <SelectorDataContext.Provider value={selectorData} key={index}>
            <Selector />
          </SelectorDataContext.Provider>
        ))}
      </div>
    </SelectorModalContext.Provider>
  );
}

// 배경화면, 페이지 컴포넌트 리팩토링!

function Selector() {
  const { Container, Label } = SelectorStyles;
  const { id, title } = useGetSelectorData();
  const { modal, openModal } = useModal();
  const query = useQuery();
  const isModal = modal[id];

  return (
    <div css={Container}>
      <div onClick={() => openModal(id)} css={Label}>
        {title + " | " + query[id]}
      </div>
      {isModal && <Modal />}
    </div>
  );
}

function Modal() {
  const { Container } = ModalStyles;
  const { title } = useGetSelectorData();

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
  const query = useQuery();

  const { options, id, route } = useGetSelectorData();
  const { closeAllModal } = useModal();

  // 모달에 Check Box Options들의 상태를 만들어준다.
  const { optionState, onClickCheckBox } = useCreateOptionsState(options, id);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeAllModal();

    // optionState라는 객체에서 값이 true인 key값을 리턴한다.
    // 사용자가 체크한 값을 가져온다 ex) saramin, jobkorea
    const chekedValue = getKeyRelevantValue(optionState, true);

    // 사용자가 체크한 값을 가져와서
    // 해당 모달의 라우트가 path이면 현재 URI를 가져와서 path부분을 추가해서 push한다.
    // 모달의 라우트가 query이면 현재URI를 가져와서 query부분을 추가한 후 push 한다.

    const { section, ...rest } = query;
    if (route === "path") {
      push({ pathname: chekedValue, query: { ...rest } });
    } else {
      push({ pathname: section, query: { ...rest, [id]: chekedValue } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {options.map(({ value, text }, index) => {
        return (
          <CheckBox
            key={index}
            id={index + ""}
            onChange={() => onClickCheckBox(value)}
            checked={optionState[value]}
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
