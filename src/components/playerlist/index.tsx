import React from "react"
import { PlayerListProps } from "../../types";
import { PlayerCardItem } from "../playercarditem";
import styled from "styled-components";
import { ErrorView } from "../errorview/";


const Container = styled.div`
   display: flex;
   flex-flow: row wrap;
`

export const PlayerList = ({ players, loading }: PlayerListProps) => {

  return players.length === 0 && !loading ?
    <ErrorView message={"Player List Empty !!! Add A New Player"} />
    :
    <Container>
      {players.map(({ player, id }) => <PlayerCardItem player={player} id={id} key={id} />)
      }
    </Container>

}