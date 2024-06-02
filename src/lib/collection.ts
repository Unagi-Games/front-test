//to fetch the data from the server
export const fetchCollection = async () => {
  try {
    const response = await fetch('http://localhost:8001/cards');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const collection = await response.json();
    return collection;
  } catch (error) {
    throw new Error(`Fetching collection failed: ${error.message}`);
  }
};
