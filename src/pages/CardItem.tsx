import React from 'react';
import { Player } from "../types/index";
import './Collection.css';
import moment from 'moment';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   flex-flow: row wrap;
`

const CardContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 0.5em;

    @media all and (min-width: 37.5em) {
        width: calc(100% / 12 * 6 );
        
    }

    @media all and (min-width: 56.25em) {
        width: calc(100% / 12 * 4 );
    }
`

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    padding: 0;
    background-color:#636260;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
`

const Image = styled.img`
    width: 60%;
    margin-left: 85px;
    border-radius: 3px 3px 0 0;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FullName = styled.h3`
    padding: 1em 1em 0;
`

const DateOfBirth = styled.p`
    padding: 1em 1em 0;
`

interface CardProps {
    data: Player[];
}

export const CardItem: React.FC<CardProps> = (props) => {

    const { data } = props;

    return (
        <Container>
            {data?.map((player: Player) => (
                <CardContainer key={player.id}>
                    <CardBody>
                        <Image src={player?.player?.image} />
                        <TextContainer>
                            <FullName>{`${player?.player?.firstname}`}  {`${player?.player?.lastname}`}</FullName>
                            <DateOfBirth>
                                Date of Birth:{' '}
                                {moment(player?.player?.birthday).format('MM/DD/YYYY')}
                            </DateOfBirth>
                        </TextContainer>
                    </CardBody>
                </CardContainer>
            ))}
        </Container>
    )
}

