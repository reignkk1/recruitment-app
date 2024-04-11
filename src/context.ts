import { Dispatch, SetStateAction, createContext } from "react";

type CategoryContextType = [
  "site" | "job" | "career" | null,
  Dispatch<SetStateAction<"site" | "job" | "career" | null>>
];

type CheckedContextType = [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>
];

export const CategoryContext = createContext<CategoryContextType>([
  null,
  () => null,
]);
export const CheckedContext = createContext<CheckedContextType>([
  undefined,
  () => undefined,
]);
