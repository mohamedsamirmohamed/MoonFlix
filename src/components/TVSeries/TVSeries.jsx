import React from 'react';
import { useMovies } from '../MovieContext/MovieContext';
import { useNavigate } from 'react-router-dom';
import styles from '../Movies/Movies.module.css';

const TVSeries = () => {
  const { popularSeries, topRatedSeries } = useMovies();
  const [activeTab, setActiveTab] = React.useState('popular');
  const [visible, setVisible] = React.useState(12);
  const navigate = useNavigate();
  const series = activeTab === 'popular' ? popularSeries : topRatedSeries;

  return (
    <div className={styles.thil}>
      <h2 className={styles.moviesTitle}>TV Series</h2>
      <button
        className={activeTab === 'popular' ? styles.activeTabBtn : styles.tabBtn}
        onClick={() => {
          setActiveTab('popular');
          setVisible(12);
        }}
      >
        Popular
      </button>
      <button
        className={activeTab === 'topRated' ? styles.activeTabBtn : styles.tabBtn}
        onClick={() => {
          setActiveTab('topRated');
          setVisible(12);
        }}
        style={{ marginLeft: '10px' }}
      >
        Top Rated
      </button>
      <div className={styles.movieList}>
        {series.slice(0, visible).map((item) => (
          <div
            key={item.id}
            className={styles.movieCard}
            onClick={() => navigate(`/tv/${item.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.name}
              className={styles.moviePoster}
            />
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
      {visible < series.length && (
        <button className={styles.loadMore} onClick={() => setVisible((prev) => prev + 12)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default TVSeries; 