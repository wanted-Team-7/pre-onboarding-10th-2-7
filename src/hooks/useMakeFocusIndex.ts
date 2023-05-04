import React, { useState } from 'react';
import { ResultsType } from '../types/searchTypes';

export default function useMakeFocusIndex() {
  const [focusIndex, setFocusIndex] = useState(-1);

  function changeIndexNumber(
    event: React.KeyboardEvent<HTMLInputElement>,
    searchResults: ResultsType[],
    searchInput: string
  ) {
    if (event.key === 'ArrowDown') {
      searchResults.length > 0 && searchResults.length < 7
        ? setFocusIndex(prev => (prev + 1) % searchResults.length)
        : setFocusIndex(prev => (prev + 1) % 7);
    }
    if (event.key === 'ArrowUp') {
      searchResults.length > 0 && searchResults.length < 7
        ? setFocusIndex(prev => (prev - 1 + searchResults.length) % searchResults.length)
        : setFocusIndex(prev => (prev - 1 + 7) % 7);
    }
    if (event.key === 'Backspace' || searchInput === '') {
      setFocusIndex(-1);
    }
  }

  return { focusIndex, changeIndexNumber };
}
