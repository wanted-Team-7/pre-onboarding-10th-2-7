import React from 'react';

export interface SearchElement {
  name: string;
  id: number;
}

export interface SetSearchListProp {
  setSearchList: React.Dispatch<React.SetStateAction<[]>>;
}
