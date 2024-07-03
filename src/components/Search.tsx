import { SelectorDataContext, SelectorModalContext } from "@/context";
import {
  useCreateModalState,
  useCreateOptionsState,
  useModal,
  useGetSelectorData,
  useQuery,
} from "@/hooks";
import { CheckBoxProps, SelectorData } from "@/types";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef } from "react";
import selectorsData from "../selectorsData.json";
import { getKeyRelevantValue } from "@/utils";

export default function Search() {
  const { data } = selectorsData;
  const { Container } = SearchStyles;

  return (
    <div css={Container}>
      <Selectors selectorsData={data} />
    </div>
  );
}

function Selectors({ selectorsData }: { selectorsData: SelectorData[] }) {
  //데이터를 기반으로 각각의 모달창 상태를 생성한다.
  const modalStateController = useCreateModalState(selectorsData);
  return (
    // ContextAPI로 prop를 줄여 컴포넌트의 의존성 제거 => 복잡도 낮아짐
    <SelectorModalContext.Provider value={modalStateController}>
      {selectorsData.map((selectorData, index) => (
        // 데이터를 기반으로 각각의 셀렉터들을 렌더링
        <SelectorDataContext.Provider value={selectorData} key={index}>
          <Selector />
        </SelectorDataContext.Provider>
      ))}
    </SelectorModalContext.Provider>
  );
}

function Selector() {
  const { Container, Label } = SelectorStyles;
  const { id, title, options } = useGetSelectorData();
  const { modal, openModal } = useModal();
  const query = useQuery();
  const isModal = modal[id];
  const valueText = options.find((option) => option.value === query[id])?.text;

  return (
    <div css={Container}>
      <div onClick={() => openModal(id)} css={Label}>
        {title + " | " + valueText}
      </div>
      {isModal && <Modal query={query} />}
    </div>
  );
}
interface QueryType {
  query: { [key: string]: string };
}

function Modal({ query }: QueryType) {
  const { ModalContainer } = SelectorStyles;
  const { title } = useGetSelectorData();
  const { closeAllModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 모달창 바깥 영역 클릭 시 모달창 닫힘
    const onClick = (e: any) => {
      if (
        !modalRef.current?.contains(e.target) &&
        !modalRef.current?.parentElement?.childNodes[0].contains(e.target)
      ) {
        closeAllModal();
      }
    };
    document.addEventListener("click", onClick);

    // 클린업 함수로 모달창 언마운트 되면 클릭 이벤트 제거
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={modalRef} css={ModalContainer}>
      <div>{title}</div>
      <ModalForm query={query} />
    </div>
  );
}

function ModalForm({ query }: QueryType) {
  const { Button } = ModalFormStyles;
  const { push } = useRouter();
  const { options, id, route } = useGetSelectorData();
  const { closeAllModal } = useModal();

  // 모달에 Check Box Options들의 상태를 만들어준다.
  const { optionState, onClickCheckBox } = useCreateOptionsState(
    options,
    id,
    query
  );

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
  ModalContainer: css`
    position: absolute;
    top: 25px;
    left: 10px;
    margin-top: 15px;
    margin-right: 20px;
    width: 200px;
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
