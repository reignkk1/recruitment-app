export interface SelectorData {
  id: string;
  title: string;
  route: string;
  options: {
    text: string;
    value: string;
    default: boolean;
  }[];
}

export interface CheckBoxProps {
  onChange: () => void;
  text: string;
  checked: boolean;
  id: string;
}
