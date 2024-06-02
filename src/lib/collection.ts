//to fetch the data from the server
export const fetchCollection = async () => {
  /**
   * Step 2: Instead of directly returning the collection, fetch it from http://localhost:8001/cards
   */

  const response = await fetch('http://localhost:8001/cards');
  const collection = await response.json();
  return collection;
};
