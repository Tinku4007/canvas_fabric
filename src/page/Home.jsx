import React, { useState } from 'react'
import SearchBar from '../components/SearchBar';
import CanvasEditor from '../components/CanvasEditor';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const [images, setImages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (images) => {
        setImages(images);
    };

    const selectImageForCanvas = (imageUrl) => {
        setSelectedImage(imageUrl);
        navigate('/canvasEditor', { state: { imageUrl } })
        // window.open(imageUrl)
    };

    const searchImages = async () => {
        const query = "nature";
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${inputValue}&client_id=6HyUc2uH58tHwHun9ixNWgnERdrOdnzqCyfgFEBfs1g`
        );
        const data = await response.json();
        // onImageSelect(data.results); // Pass images to parent component
        setImages(data.results); // Pass images to parent component
    };


    return (
        <div className="app-container">
            <div className='image_editor'>
                <h1>Please Search Images...</h1>
                <div className='box-search'>
                    <SearchBar onImageSelect={handleImageSelect} setInputValue={setInputValue} inputValue={inputValue} />
                    <button onClick={searchImages}>Search</button>
                </div>
            </div>
            <div className="image-results">
                {images?.map((img) => (
                    <div key={img.id} className="image-card">
                        <img src={img.urls.thumb} alt={img.alt_description} />
                        <button
                            className="action-btn add-text"
                            onClick={() => selectImageForCanvas(img.urls.regular)}
                        >
                            Add Captions
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home