import React from "react"
import styled from "styled-components"
import { Player } from "../../types"
import moment from "moment"

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
    color: #32027a;
`

const DateOfBirth = styled.p`
    padding: 1em 1em 0;
`

export const PlayerCardItem = ({ player, id }: Player) => (
    <CardContainer key={id}>
        <CardBody>
            <Image src={player?.image} />
            <TextContainer>
                <FullName>{`${player?.firstname}`}  {`${player?.lastname}`}</FullName>
                <DateOfBirth>
                    <strong> Date of Birth:</strong>{' '}
                    {moment(player?.birthday).format('MM/DD/YYYY')}
                </DateOfBirth>
            </TextContainer>
        </CardBody>
    </CardContainer>
)