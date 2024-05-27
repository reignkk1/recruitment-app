import { useState, useContext } from "react";
import {
  SelectorDataContext,
  SelectorModalContext,
  SelectorOptionsContext,
  SelectorValueContext,
} from "./context";
import { useRouter } from "next/router";
import { SelectorData } from "./types";

interface OptionsType {
  value: string;
  text: string;
}

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

  const closeAllModal = () => {
    setModal(initialState);
  };

  return { modal, openModal, closeAllModal };
}

export function useCreateOptionsState(
  options: OptionsType[],
  categoryValue: string
) {
  const initialState: { [key: string]: boolean } = {};
  options.forEach(({ value }) => (initialState[value] = false));

  const [option, setOption] = useState({
    ...initialState,
    [categoryValue]: true,
  });

  return { option, setOption, initialState };
}

export function useCreateValueState(selectorData: SelectorData[]) {
  const initialState: { [key: string]: string } = {};
  const query = useQuery();
  selectorData.forEach(({ id }) => (initialState[id] = query[id]));

  const [value, setValue] = useState(initialState);

  return { value, setValue };
}

export function useQuery(): { [key: string]: string } {
  const { query, asPath } = useRouter();
  let section;
  let job = query.job || "frontend";
  let career = query.career || "junior";

  if (asPath === "/") {
    section = "home";
  } else if (asPath.startsWith("/saramin")) {
    section = "saramin";
  } else if (asPath.startsWith("/jobkorea")) {
    section = "jobkorea";
  } else {
    section = "";
  }

  if (Array.isArray(job)) {
    job = job.join("");
  }
  if (Array.isArray(career)) {
    career = career.join("");
  }

  return { section, job, career };
}
