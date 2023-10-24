import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function SearchBar({ className = '', ...props }) {
  return (
    <div className='search-container'>
      <input type='text' placeholder='Search...' className='search-input' />
      <div className='search-icon'>
        <AiOutlineSearch />
      </div>
    </div>
  );
}

export default SearchBar;
