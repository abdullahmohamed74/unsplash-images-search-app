import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAppContext from '../hooks/useAppContext';

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

function Gallery() {
  const { searchTerm } = useAppContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const res = await axios.get(`${url}&query=${searchTerm}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  if (data.results.length === 0) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {data.results.map((item) => {
        return (
          <img
            className="img"
            src={item.urls.regular}
            alt={item.alt_description}
            key={item.id}
          />
        );
      })}
    </section>
  );
}
export default Gallery;
