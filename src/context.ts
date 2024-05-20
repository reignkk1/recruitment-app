import { Dispatch, SetStateAction, createContext } from "react";
import { ModalCategoryId } from "./types";

interface SelectorDataContextType {
  categoryId: ModalCategoryId;
  label: string;
  modalTitle: string;
  options: {
    id: string;
    text: string;
  }[];
}

interface SelectorModalContextType {
  modal: {
    [key: string]: boolean;
  };
  openModal: (category: ModalCategoryId) => void;
  closeAllModal: () => void;
}

interface SelectorOptionsContextType {
  option: { [key: string]: boolean };
  setOption: Dispatch<
    SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  initialState: { [key: string]: boolean };
}



export const SelectorDataContext = createContext<SelectorDataContextType>(
  null!
);

export const SelectorModalContext = createContext<SelectorModalContextType>(
  null!
);

export const SelectorOptionsContext = createContext<SelectorOptionsContextType>(
  null!
);


