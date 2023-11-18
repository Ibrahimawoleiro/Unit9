import { useState, useEffect } from 'react';
import supabase from '../config/SupabaseClient.js';

function SearchBar(props) {
  const [count, setCount] = useState(0);

  const handleSearch = (e) => {
    props.setSearch(e.target.value);
  };

  return (
    <div className='searchBar'>
      <input
        value={props.search}
        onChange={handleSearch}
        placeholder='Search 🔍'
        type='text'
      />
    </div>
  );
}

export default SearchBar;
