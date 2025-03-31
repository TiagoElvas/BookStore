import axios from 'axios';

const API_URL = "http://localhost:5051/api/books";
const API_KEY = 'AIzaSyAhf-UlXI_fNXfRlYOuRajgAXmMjPiUwzA';


export const getBooks = async () => {
  try{
    const response = await axios.get(API_URL);
    return response.data;
  } catch(error){
    console.log('Error fetching books: ', error);
    throw error;
  }
}

export const getBookById = async (id) => {
  try{
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch(error){
    console.log('Error fetching book: ', error);
    throw error;
  }
}

export const addBook = async (Book) => {
  try{
    console.log('Sending to API: ', Book);
    const response = await axios.post(API_URL, Book);
    return response.data;
  } catch(error){
    console.log('Error adding a book: ', error);
    throw error;
  }
}

export const deleteBook = async (id) => {
  try{
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log(`Delete response: `, response);
    return response.data;
  }catch(e){
    console.log('It was not possible to delete the book: ', e);
    throw e;
  }
};


export const getBookDetails = async (title, author) => {
  try{

    const query = `intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`;
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`

    );

    if(response.data.items && response.data.items.length > 0){
      const bookData = response.data.items[0].volumeInfo;

      return {
        thumbnail: bookData.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
        publishedDate: bookData.publishedDate || null,
        description: bookData.description || null,
        pageCount: bookData.pageCount || null,
        categories: bookData.categories || [],
        averageRating: bookData.averageRating || null,
        previewLink: bookData.previewLink || null
      };
    }

  }catch (e) {
    console.log('Error showing the books details. ', e);
    throw e;
  }
}