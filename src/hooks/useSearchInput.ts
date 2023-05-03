import React, { useState } from 'react';

export default function useSearchInput() {
  const [searchInput, setSearchInput] = useState('');

  function handledSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.currentTarget.value);
  }

  return { searchInput, handledSearchInput };
}
