import { CheckedContext } from "@/context";
import { useContext } from "react";

export default function useChecked() {
  const checked = useContext(CheckedContext);

  if (!checked) {
    throw new Error("checked가 존재하지 않습니다.");
  }

  return [checked.checkedId, checked.setCheckedId] as const;
}
