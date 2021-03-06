import { useState, useEffect, useRef } from "react";
import API from "../API";

const initalState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [state, setState] = useState(initalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);
      const movies = await API.fetchMovies(searchTerm, page);

      setState((prevState) => ({
        ...movies,
        results:
          page > 1
            ? [...prevState.results, ...movies.results]
            : [...movies.results],
      }));
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };
  // initial render
  useEffect(() => {
    fetchMovies(1);
  }, []);

  return { state, loading, error };
};
