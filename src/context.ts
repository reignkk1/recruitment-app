import { Dispatch, SetStateAction, createContext } from "react";

interface SelectorDataContextType {
  id: string;
  title: string;
  options: {
    text: string;
    value: string;
  }[];
}

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

interface SelectorValueContextType {
  value: {
    [key: string]: string;
  };
  setValue: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
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

export const SelectorValueContext = createContext<SelectorValueContextType>(
  null!
);
