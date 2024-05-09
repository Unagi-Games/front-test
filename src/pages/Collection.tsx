import React, { useEffect } from 'react';
import { fetchCard } from '../lib/collection';
import { toast } from 'react-toastify';
import { CardDto } from '../lib/dtos/card';
import Card from '../components/cards/Card';
import { styled } from '@mui/system';



const Body = styled('div')({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
    
});

const SearchHeader = styled('div')({
    display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0",
    gap: "10px",
});

const SearchSubHeader = styled('div')({ 
    display: "flex",
    flexDirection: "column",

    
});


const AllCards = styled('div')({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
    padding: "10px",
    border: "1px solid black",
    borderRadius: "5px",
    backgroundColor: "gold",
    width: "90vw",
    maxWidth: "800px",
    boxShadow: "0 0 10px black",
});


const Select = styled('select')({
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    border: "1px solid black",
    width: "200px",
    textAlign: "center",
});

const Imput = styled('input')({
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    border: "1px solid black",
    width: "200px",
    textAlign: "center",
});

const Button = styled('button')({
    padding: "10px",
    margin: "10px",
    backgroundColor: "gold",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
        backgroundColor: "black",
        color: "gold",
    },
});






export const Collection = () => {


  const [search, setSearch] = React.useState<string>("");
  const [cards, setCards] = React.useState<CardDto[]>([]);
  const [errorText, setErrorText] = React.useState<string>("");
  const [searchType, setSearchType] = React.useState<string>("name");




  const getCard = async () => {
    
    await fetchCard(search, searchType)
      .then((response) => {
        setCards(response.data);
        toast.success(response?.message || 'Card found');
      })
      .catch((error) => {
        setCards([]);       
        const errorText = error?.message || 'No card found';
        setErrorText(errorText);
        toast.error(errorText);
      });
  }

  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (searchType) query.set('type', searchType); 
    else query.delete('type');

    if (search) query.set('search', search);
    else query.delete('search');

    window.history.pushState({}, '', `${window.location.pathname}?${query}`);
      
  }, [search, searchType]);
      
  useEffect(() => {
    getCard();
  }, []);






  const handleUpdateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof window === 'undefined') return;


    
    const query = new URLSearchParams(window.location.search);
    if(event.target.value === "") {
      query.delete('search');
      query.delete('type');
      window.history.pushState({}, '', `${window.location.pathname}`);
      setSearch("");
      return;
    }
    query.set('search', event.target.value);
    query.set('type', searchType);
    window.history.pushState({}, '', `${window.location.pathname}?${query}`);
    setSearch(event.target.value);
  
  }



  
  return (
  <Body>

    <h1>Card Collection</h1>

    <SearchHeader>

      <SearchSubHeader>
        <h4>Search for a card by</h4>
        <Select value={searchType} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {setSearchType(event.target.value)}}>
          <option value="name">Name</option>
          <option value="id">ID</option>
        </Select>
      </SearchSubHeader>

      <SearchSubHeader>
        <h4>Search for a card</h4>
        <SearchSubHeader style={{flexDirection:"row"}}>
          <Imput type="text" placeholder="Card" value={search} onChange={handleUpdateQuery} />
          <Button onClick={getCard}>Search</Button>
        </SearchSubHeader>
      </SearchSubHeader>

      <SearchSubHeader>
        <h4>No card found?</h4>
        <Button onClick={() => {window.location.href = "/create-card"}}>Create Card</Button>
      </SearchSubHeader>

    </SearchHeader>

      {cards.length>0 ?
      <AllCards>
        {
          cards.map((card) => (
            <Card card={card} key={card.id}/>
          ))
        }
      </AllCards>
        :
        errorText?
          <div>{errorText}</div>
          :
            null
      }

  </Body>
  );
};
