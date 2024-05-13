export const fetchCollection = async () => {
  try {
    const response = await fetch('http://localhost:8001/cards');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    return error;
  }
};
