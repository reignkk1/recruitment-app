import { useState, useContext } from "react";
import {
  SelectorDataContext,
  SelectorModalContext,
  SelectorOptionsContext,
  SelectorValueContext,
} from "./context";
import { useRouter } from "next/router";
import { SelectorData } from "./types";
import selectorsData from "./selectorsData.json";

export function useGetSelectorData() {
  return useContext(SelectorDataContext);
}

export function useModal() {
  return useContext(SelectorModalContext);
}

export function useOption() {
  return useContext(SelectorOptionsContext);
}

export function useValue() {
  return useContext(SelectorValueContext);
}

// 모달 상태 생성로직
export function useCreateModalState(selectorData: SelectorData[]) {
  const initialState: { [key: string]: boolean } = {};
  selectorData.forEach(({ id }) => (initialState[id] = false));
  const [modal, setModal] = useState(initialState);

  const openModal = (category: string) => {
    setModal((prev) => {
      return prev[category]
        ? initialState
        : { ...initialState, [category]: true };
    });
  };

  const closeAllModal = () => setModal(initialState);
  return { modal, openModal, closeAllModal };
}

// 옵션 체크박스 상태 생성로직
export function useCreateOptionsState(
  options: SelectorData["options"],
  id: string
) {
  const query = useQuery();
  const initialState: { [key: string]: boolean } = {};
  options.forEach(({ value }) => (initialState[value] = false));

  const [optionState, setOption] = useState({
    ...initialState,
    [query[id]]: true,
  });

  const onClickCheckBox = (value: string) =>
    setOption({ ...initialState, [value]: true });

  return { optionState, setOption, onClickCheckBox };
}

// 모달 Value 값 상태 로직
export function useCreateValueState() {
  const query = useQuery();
  const [value, setValue] = useState(query);

  return { value, setValue };
}

// 쿼리값 로직
export function useQuery(): { [key: string]: string } {
  const { asPath } = useRouter();
  const queryString = asPath?.split("?")[1];
  let objectQuery: { [key: string]: string } = {};

  if (queryString) {
    objectQuery = Object.fromEntries(
      queryString.split("&").map((query) => query.split("="))
    );
  }
  selectorsData.data.forEach((selectorData) => {
    if (selectorData.id !== "section") {
      selectorData.options.forEach((option) => {
        if (option.default && !objectQuery[selectorData.id]) {
          objectQuery[selectorData.id] = option.value;
        }
      });
    }
  });

  if (asPath === "/") {
    objectQuery["section"] = "home";
  } else if (asPath.startsWith("/saramin")) {
    objectQuery["section"] = "saramin";
  } else if (asPath.startsWith("/jobkorea")) {
    objectQuery["section"] = "jobkorea";
  } else {
    objectQuery["section"] = "";
  }

  return objectQuery;
}
