// src/context/MovieContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const API_KEY = 'f1aca93e54807386df3f6972a5c33b50';
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoints = {
        popularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
        popularSeries: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`,
        topRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
        topRatedSeries: `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`,
      };

      try {
        const [
          popularMoviesRes,
          popularSeriesRes,
          topRatedMoviesRes,
          topRatedSeriesRes,
        ] = await Promise.all([
          axios.get(endpoints.popularMovies),
          axios.get(endpoints.popularSeries),
          axios.get(endpoints.topRatedMovies),
          axios.get(endpoints.topRatedSeries),
        ]);

        setPopularMovies(popularMoviesRes.data.results);
        setPopularSeries(popularSeriesRes.data.results);
        setTopRatedMovies(topRatedMoviesRes.data.results);
        setTopRatedSeries(topRatedSeriesRes.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MovieContext.Provider value={{ popularMovies, popularSeries, topRatedMovies, topRatedSeries }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
