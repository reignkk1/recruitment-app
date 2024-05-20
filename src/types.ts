export type ModalCategoryId = "section" | "job" | "career";

export interface SelectorData {
  categoryId: ModalCategoryId;
  label: string;
  modalTitle: string;
  options: {
    id: string;
    text: string;
  }[];
}
