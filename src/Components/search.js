// search.js
import React from "react"

const Search = ({ val, onSearch, ...props }) => {
  return (
    <div className="align-self-end">
      <input
      value={val}
      onChange={onSearch}
      placeholder="Search for an employee"
      {...props}
      />
    </div>
  );
};

export default Search