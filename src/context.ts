import { Dispatch, SetStateAction, createContext } from "react";

type CheckedContextType = [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>
];

type ModalContextType = {
  site: boolean;
  job: boolean;
  career: boolean;
};

export const CheckedContext = createContext<CheckedContextType>([
  undefined,
  () => undefined,
]);

export const ModalContext = createContext<ModalContextType>({
  site: false,
  job: false,
  career: false,
});
