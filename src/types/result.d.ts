import React from 'react';

export interface SearchResults {
  name: string;
  id: number;
}

export interface SetSearchResultFunc {
  setSearchResult: React.Dispatch<React.SetStateAction<SearchResults[]>>;
}
