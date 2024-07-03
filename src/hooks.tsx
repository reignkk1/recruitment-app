import { useState, useContext } from "react";
import {
  SelectorDataContext,
  SelectorModalContext,
  SelectorOptionsContext,
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
  id: string,
  query: { [key: string]: string }
) {
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

// 쿼리값 로직
export function useQuery() {
  const { asPath, query } = useRouter();
  const isHome = asPath === "/";
  const section = getActiveSection(asPath);

  delete query.path;

  const queryObject: { [key: string]: string } = { section, ...query };

  if (!isHome) {
    selectorsData.data.forEach(({ route, options, id }) => {
      if (route !== "path") {
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

function getActiveSection(path: string) {
  if (path === "/") {
    return "home";
  } else if (path.startsWith("/saramin")) {
    return "saramin";
  } else if (path.startsWith("/jobkorea")) {
    return "jobkorea";
  } else {
    return "unknown";
  }
}
