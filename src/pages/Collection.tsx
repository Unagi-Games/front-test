import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFetchCollections } from '../hooks/useFetchCollection';
import { Loader } from '../components/loader';
import { PlayerList } from '../components/playerlist';
import './Collection.css';
import { ErrorView } from '../components/errorview';
import { CreateCard } from './CreateCard';


const Title = styled.h1`
text-align: center;
margin-top: 10px;
margin-bottom: 5px;
color: grey;
font-family: serif;
`

export const Collection: React.FC = () => {

  const { data, loading, error, fetchPlayer } = useFetchCollections();

  const [retrigger, setRetrigger] = useState(false)


  const retriggered = () => setRetrigger(true)

  useEffect(() => {
    if (retrigger) {
      fetchPlayer()
      setRetrigger(false)
    }
  }, [retrigger]);

  return (
    <>

      <Title>Players Info Board</Title>

      <Loader visible={loading} />

      {error && <ErrorView message={"Unable To Fetch Players"} />}

      <CreateCard retrigger={retriggered} />

      <PlayerList players={data} loading={loading} />

    </>

  )

};
