import React, { createContext, useContext, useState, useCallback } from 'react';

const DetailsItemContext = createContext();

export const useDetailsItem = () => {
  const context = useContext(DetailsItemContext);
  if (!context) {
    throw new Error('useDetailsItem must be used within a DetailsItemProvider');
  }
  return context;
};

export const DetailsItemProvider = ({ children }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [seriesDetails, setSeriesDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [videos, setVideos] = useState([]); // جديد
  const [backdrops, setBackdrops] = useState([]); // جديد
  const [posters, setPosters] = useState([]); // جديد
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'f1aca93e54807386df3f6972a5c33b50';
  const BASE_URL = 'https://api.themoviedb.org/3';

  const fetchMovieDetails = useCallback(async (movieId) => {
    setLoading(true);
    setError(null);
    
    try {
      const movieResponse = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      if (!movieResponse.ok) throw new Error('Failed to fetch movie details');
      const movieData = await movieResponse.json();
      setMovieDetails(movieData);

      const castResponse = await fetch(
        `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
      );
      if (castResponse.ok) {
        const castData = await castResponse.json();
        setCast(castData.cast.slice(0, 10));
      }

      const trailerResponse = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
      );
      if (trailerResponse.ok) {
        const trailerData = await trailerResponse.json();
        setVideos(trailerData.results); // جديد: خزّن كل الفيديوهات
        const youtubeTrailer = trailerData.results.find(
          video => video.site === 'YouTube' && video.type === 'Trailer'
        );
        setTrailer(youtubeTrailer);
      }

      // جلب صور الخلفيات والبوسترات
      const imagesResponse = await fetch(
        `${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`
      );
      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json();
        setBackdrops(imagesData.backdrops || []);
        setPosters(imagesData.posters || []);
      }

    } catch (err) {
      setError(err.message);
      console.error('Error fetching movie details:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSeriesDetails = useCallback(async (seriesId) => {
    setLoading(true);
    setError(null);
    
    try {
      const seriesResponse = await fetch(
        `${BASE_URL}/tv/${seriesId}?api_key=${API_KEY}&language=en-US`
      );
      if (!seriesResponse.ok) throw new Error('Failed to fetch series details');
      const seriesData = await seriesResponse.json();
      setSeriesDetails(seriesData);

      const castResponse = await fetch(
        `${BASE_URL}/tv/${seriesId}/credits?api_key=${API_KEY}&language=en-US`
      );
      if (castResponse.ok) {
        const castData = await castResponse.json();
        setCast(castData.cast.slice(0, 10));
      }

      const trailerResponse = await fetch(
        `${BASE_URL}/tv/${seriesId}/videos?api_key=${API_KEY}&language=en-US`
      );
      if (trailerResponse.ok) {
        const trailerData = await trailerResponse.json();
        setVideos(trailerData.results); // جديد: خزّن كل الفيديوهات
        const youtubeTrailer = trailerData.results.find(
          video => video.site === 'YouTube' && video.type === 'Trailer'
        );
        setTrailer(youtubeTrailer);
      }

      // جلب صور الخلفيات والبوسترات للمسلسل
      const imagesResponse = await fetch(
        `${BASE_URL}/tv/${seriesId}/images?api_key=${API_KEY}`
      );
      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json();
        setBackdrops(imagesData.backdrops || []);
        setPosters(imagesData.posters || []);
      }

    } catch (err) {
      setError(err.message);
      console.error('Error fetching series details:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearDetails = useCallback(() => {
    setMovieDetails(null);
    setSeriesDetails(null);
    setCast([]);
    setTrailer(null);
    setVideos([]); // جديد
    setBackdrops([]); // جديد
    setPosters([]); // جديد
    setError(null);
  }, []);

  const value = {
    movieDetails,
    seriesDetails,
    cast,
    trailer,
    videos, // جديد
    backdrops, // جديد
    posters, // جديد
    loading,
    error,
    fetchMovieDetails,
    fetchSeriesDetails,
    clearDetails,
  };

  return (
    <DetailsItemContext.Provider value={value}>
      {children}
    </DetailsItemContext.Provider>
  );
};
