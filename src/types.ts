export interface SelectorData {
  id: string;
  title: string;
  options: {
    text: string;
    value: string;
  }[];
}

export interface CheckBoxProps {
  onChange: () => void;
  text: string;
  checked: boolean;
  id: string;
}
