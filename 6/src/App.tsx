import React, { useState } from 'react';
import './App.scss';

const images = [
    require('../assets/images/image1.jpg'),
    require('../assets/images/image2.jpg'),
    require('../assets/images/image3.jpg'),
    require('../assets/images/image4.jpg'),
    require('../assets/images/image5.jpg'),
];

const App: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [width, setWidth] = useState(300);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className='app'>
            <div className='image-container'>
                <button onClick={prevImage}>&larr;</button>
                <img src={images[currentIndex]} alt='image' style={{ width: `${width}px`, height: 'auto' }} />
                <button onClick={nextImage}>&rarr;</button>
            </div>
            <input
                type='range'
                min='50'
                max='800'
                step='1'
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
            />
            <p>Width: {width}px</p>
        </div>
    );
};

export default App;
