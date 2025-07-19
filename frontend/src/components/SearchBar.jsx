import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name, email, or department..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
    />
  );
};

export default SearchBar;