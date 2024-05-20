import { useState, useContext } from "react";
import {
  SelectorDataContext,
  SelectorModalContext,
  SelectorOptionsContext,
} from "./context";
import { useRouter } from "next/router";
import { ModalCategoryId, SelectorData } from "./types";

interface OptionsType {
  id: string;
  text: string;
}

export function useSelectorData() {
  return useContext(SelectorDataContext);
}

export function useModal() {
  return useContext(SelectorModalContext);
}

export function useOption() {
  return useContext(SelectorOptionsContext);
}

export function useCreateModal(selectorData: SelectorData[]) {
  const initialState: { [key: string]: boolean } = {};
  selectorData.forEach(({ categoryId }) => (initialState[categoryId] = false));
  const [modal, setModal] = useState(initialState);

  const openModal = (category: ModalCategoryId) => {
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

export function useCreateOptions(options: OptionsType[], category: string) {
  const initialState: { [key: string]: boolean } = {};
  options.forEach(({ id }) => (initialState[id] = false));

  const [option, setOption] = useState({ ...initialState, [category]: true });

  return { option, setOption, initialState };
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
