import React, { FC } from 'react';

type TProps = {
	src: string;
	alt: string;
	width?: string | number;
	height?: string | number;
};

const Image: FC<TProps> = ({ src, alt, height = '100%', width = '100%' }) => {
	const completeUrl = `${process.env.REACT_APP_BASE_URL}/${src}.png`;

	return <img src={completeUrl} alt={alt} height={height} width={width} />;
};

export default Image;
