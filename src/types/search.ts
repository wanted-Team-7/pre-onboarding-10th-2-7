import React from 'react';

export interface SearchResultTypes {
  name: string;
  id: number;
}

export interface SearchFormType {
  setSearchResult: React.Dispatch<React.SetStateAction<SearchResultTypes[]>>;
}

export interface SearchListType {
  searchResult: SearchResultTypes[];
}
