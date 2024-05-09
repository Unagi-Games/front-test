import * as React from 'react';
import { useState, useEffect } from 'react';
import { CardDto } from '../../lib/dtos/card';
import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';

import backgroundImage from '../../assets/images/gold_background.jpeg';
import unknownPlayer from '../../assets/images/unknown_player.png';


const CardBody = styled('div')({
    width: "250px",
    height: "400px",
    border: "5px solid black",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${backgroundImage})`,
    position: "relative",
    color: "gold",
});

const CardData = styled('div')({
    width: "100%",
    height: "40%",
    position: "absolute",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(0deg, rgba(2,0,36,1) 70%, rgba(0,0,0,0) 100%)",
});

const ImageContainer = styled('div')({
    width: "100%",
    height: "60%",
    position: "absolute",
    top: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: "20px",

});

const Image = styled('img')({
    width: "100%",
    height: "100%",
    objectFit: "fill",
    borderRadius: "5px 5px 0 0",

});

const FirstName = styled('h1')({
    fontSize: "18pt",
    fontWeight: "bold",
    margin: "20px 0 0 0",
});

const LastName = styled('h1')({
    fontSize: "30pt",
    fontWeight: "bold",
    margin: "0",
});

const Age = styled('div')({
    fontSize: "14pt",
    display: "flex",
    width: "30%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "20px auto 0 0",

});



const formatDateToGetAge = (date: string) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


export default function Card({ 
    card,
 }: { 
    card: CardDto,
 }) {

    const [isLoading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    
    return (
        <CardBody>
            <ImageContainer>
                {isLoading && <CircularProgress color="secondary" />}
                <Image
                    src={card.player.image}
                    alt="player"
                    onLoad={() => setTimeout(() => setLoading(false), 1500)}
                    onError={() => {setLoading(false); setImageError(true); console.log('Image not found')}}
                    style={{ display: isLoading || imageError ? 'none' : 'block' }}
                />
                {
                    imageError && 
                    <Image
                        src={unknownPlayer}
                        alt="player"
                        style={{ display: imageError ? 'block' : 'none' }} 
                    />

                }
            </ImageContainer>
            <CardData>
                <FirstName>{card.player.firstname}</FirstName>
                <LastName>{card.player.lastname}</LastName>
                <Age>{formatDateToGetAge(card.player.birthday)}<br/>AGE</Age>
            </CardData>


        </CardBody>
    );
    }