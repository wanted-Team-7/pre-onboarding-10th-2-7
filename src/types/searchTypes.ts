export type ResultsType = {
  name: string;
  id: number;
};

export type SearchResultStoreType = {
  searchTerm: string;
  resultList: ResultsType[];
};
