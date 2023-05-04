import { ChangeEventHandler, MouseEventHandler, KeyboardEventHandler } from 'react';

export interface DataItem {
  name: string;
  id: number;
}

export interface DropdownListProps {
  keyword: string;
  selectedIndex: number;
  dataIndex: number;
}

export interface SearchInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler;
  onKeyDown: KeyboardEventHandler;
}
