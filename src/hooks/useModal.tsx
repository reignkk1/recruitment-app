import { useState } from "react";

/**
 *
 *
 * @returns 모달상태와 모달을 여는 함수를 반환한다.
 */

export default function useModal() {
  const initialState = {
    site: false,
    job: false,
    career: false,
  };
  const [modal, setModal] = useState(initialState);
  const openModal = (category: "site" | "job" | "career") => {
    setModal((prev) => {
      if (category === "site") {
        return prev.site ? initialState : { ...initialState, site: true };
      } else if (category === "job") {
        return prev.job ? initialState : { ...initialState, job: true };
      } else if (category === "career") {
        return prev.career ? initialState : { ...initialState, career: true };
      } else {
        return prev;
      }
    });
  };

  return [modal, openModal] as const;
}
