import axios from 'axios';

const API_KEY = "N1whRlACpfTlzZ0HqIPhUah6KcA0a5ne";
const API_URL = "https://api.nytimes.com/svc/books/v3"
const API_URL_HISTORY = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json"

export async function getBestSellers() {
  try {
    const response = await axios.get(`${API_URL}/lists/current/hardcover-fiction.json?api-key=${API_KEY}`);
    return response.data.results.books; // Returns an array of books
  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    return [];
  }

}

export async function getBestSellersHistory(title) {
  try{
    const response = await axios.get(`${API_URL_HISTORY}`, {
      params: {
        title: title,
        'api-key': API_KEY
      }
    });
  return response.data.results;
  } catch(error){
    console.log('Error fetching best seller history:', error);
    return [];
  }
}


