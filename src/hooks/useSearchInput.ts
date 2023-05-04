import React, { useState } from 'react';

export default function useSearchInput() {
  const [searchInput, setSearchInput] = useState('');

  function handledSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.currentTarget.value);
  }

  function handledSearchInputClear() {
    setSearchInput('');
  }

  return { searchInput, handledSearchInput, handledSearchInputClear };
}
