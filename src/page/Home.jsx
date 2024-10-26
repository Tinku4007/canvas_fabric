import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CanvasEditor from '../components/CanvasEditor';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [searched, setSearched] = useState(false); // Track if search button clicked

    const handleImageSelect = (images) => {
        setImages(images);
    };

    const selectImageForCanvas = (imageUrl) => {
        setSelectedImage(imageUrl);
        navigate('/canvasEditor', { state: { imageUrl } });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchImages(); // Call the search function on Enter key press
        }
    };

    const searchImages = async () => {
        setSearched(true); // Set searched to true before making API call
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${inputValue}&client_id=6HyUc2uH58tHwHun9ixNWgnERdrOdnzqCyfgFEBfs1g`
        );
        const data = await response.json();
        setImages(data.results); // Update images with search results
    };

    return (
        <div className="app-container">
            <div>
                <h4 className='name'>Name: Tinku Saini</h4>
                <h4>Email: Tinkusaini1252@gmail.com</h4>
            </div>
            <div className='image_editor'>
                <h1>Please Search Images...</h1>
                <div className='box-search'>
                    <SearchBar onImageSelect={handleImageSelect} onKeyPress={handleKeyPress} setInputValue={setInputValue} inputValue={inputValue} />
                    <button onClick={searchImages}>Search</button>
                </div>
            </div>
            <div className="image-results">
                {
                    searched && images.length === 0 ? (
                        <p>Not Found</p> // Show "Not Found" if no images are found after search
                    ) : (
                        images.map((img) => (
                            <div key={img.id} className="image-card">
                                <img src={img.urls.thumb} alt={img.alt_description} />
                                <button
                                    className="action-btn add-text"
                                    onClick={() => selectImageForCanvas(img.urls.regular)}
                                >
                                    Add Captions
                                </button>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default Home;
