const baseUrl = 'https://5e5cf5eb97d2ea0014796f01.mockapi.io/api/v1/airport';

const fetchRequest = async () => {
  const response = await fetch(baseUrl);
  return await response.json();
};

export default fetchRequest;
