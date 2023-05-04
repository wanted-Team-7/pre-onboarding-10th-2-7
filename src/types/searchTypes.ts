export type ResultsType = {
  name: string;
  id: number;
};

export type SearchResultStoreType = {
  searchTerm: string;
  resultList: ResultsType[];
};

export type SearchResultsPropType = {
  searchResults: ResultsType[];
  searchInput: string;
  searchTerm: string;
  focusIndex: number;
};

export type SearchSectionType = {
  isVisibleSearchResults: boolean;
  setIsVisibleSearchResults: (isVisibleSearchResults: boolean) => void;
};
