import React, { useState, useEffect } from 'react';
import styles from '../Home/Home.module.css';
import { FaPlay } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { useMovies } from '../MovieContext/MovieContext';
import { Link } from 'react-router-dom'; // ✅ جديد: علشان نستخدمه في التنقل

// الكومبوننت لعرض سكشن من الأفلام أو المسلسلات
const MovieSection = ({ title, data }) => {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.movieGrid}>
        {data.slice(0, 14).map((item) => (
          <Link
            key={item.id}
            to={`/${item.media_type || (title.includes('Series') ? 'tv' : 'movie')}/${item.id}`} // ✅ رابط ديناميكي حسب النوع
            className={styles.movieCard}
          >
            <img
              src={imageBaseUrl + item.poster_path}
              alt={item.title || item.name}
              className={styles.movieImage}
            />
            <div className={styles.overlayInfo}>
              <h5>{item.title || item.name}</h5>
              <p>
                ⭐ {item.vote_average} |{" "}
                {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0]}
              </p>
            </div>
            <div className={styles.youtubeOverlay}>
              <FaYoutube className={styles.youtubeIcon} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// الكومبوننت الرئيسي Home
const Home = () => {
  const { popularMovies, popularSeries, topRatedMovies, topRatedSeries } = useMovies();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p className={styles.loadingText}>MoonFlix  ...</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.heroSection}>
        <div className={styles.overlay}></div>
        <div className={`container ${styles.content}`}>
          <h1 className="display-4 fw-bold">
            Z-O-M-B-I-E-S 4:<br />Dawn of the...
          </h1>
          <div className={styles.badges}>
            <span className={styles['badge-number']}>7</span>
            <span className={`badge ${styles['badge-pill']}`}>Music</span>
            <span className={`badge ${styles['badge-pill']}`}>Adventure</span>
          </div>
          <p className={styles.fs6}>
            A new adventure dawns for Zed and Addison when their summer road trip takes an unexpected detour...
          </p>
          <button className={styles['btn-watch']}>
            <FaPlay style={{ marginRight: "7px", color: "white" }} /> WATCH NOW
          </button>
        </div>
      </div>

      <div className="container mt-5">
        <MovieSection title="Popular Movies" data={popularMovies} />
        <MovieSection title="Popular Series" data={popularSeries} />
        <MovieSection title="Top Rated Movies" data={topRatedMovies} />
        <MovieSection title="Top Rated Series" data={topRatedSeries} />
      </div>
    </>
  );
};

export default Home;
