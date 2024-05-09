import axiosInstance from "./axios";
import { CardDto } from "./dtos/card";
import axios from "axios";

class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
    this.name = "CustomError";
  }
}

export const fetchCard = async (search: string, type: string) => {

  if (!type || !["id", "name"].includes(type as string)) {
    throw new CustomError('Invalid search type', 400);
  }

  try {
    if(type=== "id"){
      const response = await axiosInstance.get<CardDto>(`/cards/${search}`)

      console.log(response.data);
      
      
      return {
        data: [response.data],
        status: "success",
        message: "Card found",
      }
    }
    else if(type==="name"){     
      // search contains the name of the card - cusutom search
      const allCards = await axiosInstance.get<CardDto[]>(`/cards`)
      const cards = allCards.data.filter(card => card.player.firstname.toLowerCase().includes(search.toLowerCase()) || card.player.lastname.toLowerCase().includes(search.toLowerCase()));

      if(cards.length === 0){
        console.log("Card not found");
        
        throw new CustomError('Card not found', 404);
      }
      
      console.log(cards);

      return {
        data: cards,
        status: "success",
        message: "Card found",
      };
    
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      const status = error.response?.status ?? 500;
      throw new CustomError('Card not found', status);
    }

    console.error('Unexpected error:', JSON.stringify(error));
    throw  error
  }
};


export const createCard = async (card: CardDto) => {
  try {
    const response = await axiosInstance.post<CardDto>('/cards', card);
    return {
      data: response.data,
      status: "success",
      message: "Card created",
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      const status = error.response?.status ?? 500;
      throw new CustomError('Card not created', status);
    }

    console.error('Unexpected error:', JSON.stringify(error));
    throw  error
  }
}