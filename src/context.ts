import { Dispatch, SetStateAction, createContext } from "react";
import { SelectorData } from "./types";

interface SelectorDataContextType extends SelectorData {}

interface SelectorModalContextType {
  modal: {
    [key: string]: boolean;
  };
  openModal: (category: string) => void;
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
