// استيراد الأدوات من React
import React, { useEffect, useState } from 'react';
// استيراد الهُوك المخصص لجلب بيانات الأفلام من السياق
import { useMovies } from '../MoviesContext/MoviesContext'; // تأكد من صحة المسار حسب المشروع
import { useDetailsItem } from '../DetailsContxt/DetailsItemContext'; // استيراد الهُوك الخاص بالتفاصيل
import { useNavigate } from 'react-router-dom'; // للتنقل بين الصفحات
// استيراد ملف الأنماط (CSS Modules)
import styles from './Movies.module.css';
// استيراد مكونات Swiper لعمل السلايدر
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
// استيراد أيقونة التشغيل
import { FaPlay } from 'react-icons/fa';

const Movies = () => {
  const { popularMovies, topRatedMovies } = useMovies();
  const [visible, setVisible] = useState(10);
  const [activeTab, setActiveTab] = useState('popular');
  const [loading, setLoading] = useState(true);
  const { fetchMovieDetails } = useDetailsItem(); // استخدام الدالة الجديدة لجلب التفاصيل
  const navigate = useNavigate(); // التنقل للصفحات

  const loadMore = () => setVisible((prev) => prev + 10);
  const movies = activeTab === 'popular' ? popularMovies : topRatedMovies;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const goToDetails = async (movie) => {
    await fetchMovieDetails(movie.id);
    navigate(`/movie/${movie.id}`);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p className={styles.loadingText}>MoonFlix ...</p>
      </div>
    );
  }

  return (
    <div className={styles.thil}>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
      >
        {movies.slice(0, 4).map((movie) => (
          <SwiperSlide key={movie.id} onClick={() => goToDetails(movie)} style={{ cursor: 'pointer' }}>
            <div
              className={styles.heroSection}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                position: 'relative',
              }}
            >
              <div className={styles.overlay}></div>
              <div className={`container ${styles.content}`}>
                <div>
                  <h1 className="display-4 fw-bold">{movie.title || movie.name}</h1>
                </div>
                <div>
                  <div className={styles.badges}>
                    <span className={styles['badge-number']}>
                      {movie.vote_average?.toFixed(1)}
                    </span>
                    <span className={`badge ${styles['badge-pill']}`}>Action</span>
                    <span className={`badge ${styles['badge-pill']}`}>Drama</span>
                  </div>
                  <p className={styles.fs6}>{movie.overview?.slice(0, 200)}...</p>
                </div>
                <div>
                  <button className={styles['btn-watch']}>
                    <FaPlay style={{ marginRight: '7px', color: 'white' }} />
                    WATCH NOW
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px 10px',
        }}
      >
        <h2 className={styles.moviesTitle} style={{ marginRight: '20px' }}>
          Movies
        </h2>
        <button
          className={activeTab === 'popular' ? styles.activeTabBtn : styles.tabBtn}
          onClick={() => {
            setActiveTab('popular');
            setVisible(10);
          }}
        >
          Popular
        </button>
        <button
          className={activeTab === 'topRated' ? styles.activeTabBtn : styles.tabBtn}
          onClick={() => {
            setActiveTab('topRated');
            setVisible(10);
          }}
          style={{ marginLeft: '10px' }}
        >
          Top Rated
        </button>
      </div>

      <div className={styles.movieList}>
        {movies.slice(0, visible).map((movie) => (
          <div
            key={movie.id}
            className={styles.movieCard}
            onClick={() => goToDetails(movie)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.moviePoster}
            />
            <h4>{movie.title}</h4>
          </div>
        ))}
      </div>

      {visible < movies.length && (
        <button className={styles.loadMore} onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Movies;
