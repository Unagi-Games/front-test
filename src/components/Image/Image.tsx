import React, { Children, FC, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import placeHolder from '../../assets/blurry.png';

type TProps = {
	src: string;
	alt: string;
	width?: string | number;
	height?: string | number;
	lazyLoading?: boolean;
};

const pulse = keyframes`
		0% {
			background-color: rgba(255, 255, 255, 0);
				
		}

		50% {
			background-color: rgba(234, 233, 233, 0.4);
		}
		100% {
			background-color: rgba(255, 255, 255, 0);
		}
		`;

const StyledWrapper = styled.div<{ imgLoaded: boolean }>`
	background-size: cover;
	background-image: url(${(props) => (props.imgLoaded ? '' : placeHolder)});
	background-position: center;
	height: 100%;
	width: 100%;
	display: block;
	position: relative;
	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background-color: rgba(255, 255, 255, 0.1);
		animation: ${pulse} 2.5s infinite;
		display: ${(props) => (props.imgLoaded ? 'none' : 'visible')};
	}
`;

const StyledImage = styled.img<{ imgLoaded: boolean }>`
	aspect-ratio: 1/1;
	object-fit: cover;
	object-position: center;
	display: block;
	transition: opacity 200ms ease-in-out;
	opacity: ${(props) => (props.imgLoaded ? 1 : 0)};
`;

const Image: FC<TProps> = ({
	src,
	alt,
	height = '100%',
	width = '100%',
	lazyLoading = true,
}) => {
	const completeUrl = `${process.env.REACT_APP_BASE_URL}/${src}.png`;
	const [imgLoaded, setImageLoaded] = useState(false);

	return (
		<StyledWrapper imgLoaded={imgLoaded}>
			{/* we add tag picture for most optimal case so convert to webp */}
			<picture>
				<source
					type="image/webp"
					srcSet={`${completeUrl}?width=100 100w,
					${completeUrl}?width=200 200w
					,${completeUrl}?width=400 400w,
					${completeUrl}?width=800 800w`}
				/>
				<StyledImage
					src={`${completeUrl}`}
					alt={alt}
					height={height}
					width={width}
					loading={lazyLoading ? 'lazy' : 'eager'}
					onLoad={() => setImageLoaded(true)}
					imgLoaded={imgLoaded}
					srcSet={`${completeUrl}?width=100 100w,
					${completeUrl}?width=200 200w
					,${completeUrl}?width=400 400w,
					${completeUrl}?width=800 800w`}
				/>
			</picture>
		</StyledWrapper>
	);
};

export default Image;
