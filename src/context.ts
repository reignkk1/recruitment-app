import { Dispatch, SetStateAction, createContext } from "react";

interface CheckedContextType {
  checkedId: string;
  setCheckedId: Dispatch<SetStateAction<string>>;
}

type QueryContextType = string | string[] | null;

export const CheckedContext = createContext<CheckedContextType | null>(null);

export const QueryContext = createContext<QueryContextType>(null);
