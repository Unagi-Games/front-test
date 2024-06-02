import React, { useState } from 'react';

/**
 * Step 3: Render a form and everything needed to be able to create a card
 */
export const LazyImage = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className="image-container">
            {!loaded && <div className="loading-indicator">Loading...</div>}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                style={{ display: loaded ? 'block' : 'none' }}
            />
        </div>
    );
};
