import { useState, useContext } from "react";
import {
  SelectorDataContext,
  SelectorModalContext,
  SelectorOptionsContext,
} from "./context";
import { useRouter } from "next/router";
import { SelectorData } from "./types";
import selectorsData from "./selectorsData.json";
import { getActiveSection } from "./utils";

export function useSelectorData() {
  return useContext(SelectorDataContext);
}

export function useModal() {
  return useContext(SelectorModalContext);
}

export function useOption() {
  return useContext(SelectorOptionsContext);
}

// 모달 상태 생성로직
export function useModalStore(selectorData: SelectorData[]) {
  const initialState: { [key: string]: boolean } = {};
  selectorData.forEach(({ id }) => (initialState[id] = false));

  const [modal, setModal] = useState(initialState);

  const toggleModal = (id: string) =>
    setModal((prev) => {
      return prev[id] ? initialState : { ...initialState, [id]: true };
    });

  const closeAllModal = () => setModal(initialState);
  return { modal, toggleModal, closeAllModal };
}

// 옵션 체크박스 상태 생성로직
export function useOptionsStore(
  options: SelectorData["options"],
  id: string,
  query: { [key: string]: string }
) {
  const initialState: { [key: string]: boolean } = {};
  options.forEach(({ value }) => (initialState[value] = false));

  const [option, setOption] = useState({
    ...initialState,
    [query[id]]: true,
  });

  const onClickCheckBox = (value: string) =>
    setOption({ ...initialState, [value]: true });

  return { option, setOption, onClickCheckBox };
}

// 쿼리값 로직
export function useQuery() {
  const { asPath, query } = useRouter();
  const section = getActiveSection(asPath);
  const isHome = asPath === "/";

  // query 객체에 path를 지우고 section으로 표현
  delete query.path;
  const queryObject: { [key: string]: string } = { section, ...query };

  if (!isHome) {
    selectorsData.data.forEach(({ options, id }) => {
      if (id !== "section") {
        options.forEach((option) => {
          if (option.default && !queryObject[id]) {
            queryObject[id] = option.value;
          }
        });
      }
    });
    if (!Object.hasOwn(queryObject, "page")) {
      queryObject["page"] = "1";
    }
  }

  return queryObject;
}
