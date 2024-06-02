import React, { useState } from 'react';
import styled from 'styled-components';

/**
 * Step 3: Render a form and everything needed to be able to create a card
 */
export const LazyImage = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <ImageContainer>
            {!loaded && <LoadingIndicator>Loading...</LoadingIndicator>}
            <StyledImage
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                style={{ display: loaded ? 'block' : 'none' }}
            />
        </ImageContainer>
    );
};

const ImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #888;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;
