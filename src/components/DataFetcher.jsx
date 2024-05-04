import { useEffect } from 'react';
import axios from 'axios';

const DataFetcher = ({ setData }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fake-book-store-api.onrender.com/api/books');
        const booksData = response.data.map(book => ({
          Id: book._id,
          Name: book.name,
          Author: book.author,
          Category: book.category.name
        }));
        setData(booksData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [setData]);

  return null; 
};

export default DataFetcher;
