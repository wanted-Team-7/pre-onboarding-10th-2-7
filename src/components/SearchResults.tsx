import { ResultsType } from '../types/searchTypes';

type ResultsTypes = {
  searchResults: ResultsType[];
};

export default function SearchResults({ searchResults }: ResultsTypes) {
  return (
    <div>
      {searchResults.map((result, index) => {
        if (index < 7) return <div key={result.id}>{result.name}</div>;
      })}
    </div>
  );
}
