import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar({ className = "", ...props }) {
  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." className="search-input" />
      <span className="search-icon">
        <AiOutlineSearch />
      </span>
    </div>
  );
}

export default SearchBar;
