// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onImageSelect, setInputValue, inputValue }) {
    // const [query, setQuery] = useState('');

    // const searchImages = async () => {
    //     const query = "nature";
    //     const response = await fetch(
    //         // `https://api.unsplash.com/search/photos?query=${query}&client_id=YOUR_UNSPLASH_ACCESS_KEY`
    //         `https://api.unsplash.com/search/photos?query=${query}&client_id=6HyUc2uH58tHwHun9ixNWgnERdrOdnzqCyfgFEBfs1g`
    //     );
    //     const data = await response.json();
    //     onImageSelect(data.results); // Pass images to parent component
    // };

    return (
        <input
            type="text"
            placeholder="Search images..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
    );
}

export default SearchBar;
