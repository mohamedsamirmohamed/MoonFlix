import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDetailsItem } from '../DetailsContxt/DetailsItemContext';
import styless from '../DetailsItem/DetailsItem.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { FaPlay } from 'react-icons/fa';

const DetailsItem = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    movieDetails,
    seriesDetails,
    cast,
    videos, // جديد
    backdrops, // جديد
    posters, // جديد
    loading,
    error,
    fetchMovieDetails,
    fetchSeriesDetails,
    clearDetails
  } = useDetailsItem();

  const isMovie = location.pathname.includes('/movie/');
  const details = isMovie ? movieDetails : seriesDetails;

  useEffect(() => {
    if (id) {
      clearDetails();
      if (isMovie) {
        fetchMovieDetails(id);
      } else {
        fetchSeriesDetails(id);
      }
    }

    return () => {
      clearDetails();
    };
  }, [id, isMovie, clearDetails, fetchMovieDetails, fetchSeriesDetails]);

  if (loading) {
    return (
      <div className={styless['details-loading']}>
        <div className={styless['loading-spinner']}></div>
        <p>MoonFlix...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styless['details-error']}>
        <h2> MoonFlix.....</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className={styless['details-not-found']}>
        <h2>لم يتم العثور على التفاصيل</h2>
      </div>
    );
  }

  const {
    title,
    name,
    poster_path,
    backdrop_path,
    overview,
    release_date,
    first_air_date,
    vote_average,
    genres,
  } = details;

  const displayTitle = title || name;
  const backdropUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  // Hero Section للتفاصيل
  if (!isMovie) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh', color: 'white' }}>
        {backdrop_path && (
          <div style={{
            backgroundImage: `url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 60%, #111 100%)', position: 'absolute', top: 0, left: 0, zIndex: 2 }}></div>
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 3, padding: '120px 0 0 0', maxWidth: 900, margin: '0 auto' }}>
          <h1 style={{ fontSize: 56, fontWeight: 700, marginBottom: 24 }}>{displayTitle}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
            {/* تقييم دائري */}
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #2ecc40', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: '#2ecc40', background: '#181818' }}>
              {vote_average ? vote_average.toFixed(1) : '-'}
            </div>
            {/* التصنيفات */}
            {genres && genres.map(genre => (
              <span key={genre.id} style={{ background: 'red', color: '#fff', borderRadius: 16, padding: '6px 18px', fontWeight: 700, fontSize: 16, marginRight: 8 }}>{genre.name}</span>
            ))}
          </div>
          {overview && (
            <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 32, maxWidth: 700 }}>{overview}</p>
          )}
          <button style={{ background: 'red', color: '#fff', border: 'none', borderRadius: 6, padding: '14px 32px', fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, cursor: 'pointer' }}>
            <FaPlay /> WATCH NOW
          </button>
        </div>
        {/* باقي البيانات */}
        <div style={{ position: 'relative', zIndex: 4, marginTop: 40 }}>
          {/* Cast */}
          {cast && cast.length > 0 && (
            <div className={styless['details-cast']}>
              <h3>Cast</h3>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                {cast.slice(0, 4).map((actor) => (
                  <div
                    key={actor.id}
                    style={{ width: 170, height: 220, borderRadius: 8, overflow: 'hidden', background: '#222', position: 'relative', flex: '0 0 170px', cursor: 'pointer' }}
                    onClick={() => navigate(`/person/${actor.id}`)}
                  >
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                        alt={actor.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 32 }}>
                        <span>👤</span>
                      </div>
                    )}
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 40,
                      background: 'rgba(0,0,0,0.85)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      fontWeight: 600,
                      fontSize: 17,
                      letterSpacing: 0.2,
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                      textShadow: '0 1px 2px #000',
                    }}>
                      {actor.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Videos */}
          {videos && videos.length > 0 && (
            <div className={styless['details-videos']} style={{ margin: '40px 0' }}>
              <h2 style={{
                color: 'white',
                borderBottom: '3px solid red',
                display: 'inline-block',
                marginBottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'relative',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 28
              }}>VIDEOS</h2>
              <Swiper
                slidesPerView={3}
                spaceBetween={0}
                style={{ padding: '20px 0', maxWidth: 1100, margin: '0 auto' }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  600: { slidesPerView: 2 },
                  900: { slidesPerView: 3 },
                }}
                modules={[Autoplay]}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
              >
                {videos.filter(v => v.site === 'YouTube').map((video) => (
                  <SwiperSlide key={video.id}>
                    <div style={{ width: '100%', textAlign: 'center', background: '#111', borderRadius: 12, padding: 12 }}>
                      <a href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img
                          src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                          alt={video.name}
                          style={{ width: '100%', borderRadius: 8, marginBottom: 8 }}
                        />
                        <div style={{ fontWeight: 'bold', color: 'white', fontSize: 16, marginBottom: 4 }}>{video.name}</div>
                        <div style={{ color: '#aaa', fontSize: 13 }}>{video.type}</div>
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {/* Backdrops */}
          {backdrops && backdrops.length > 0 && (
            <div className={styless['details-backdrops']} style={{ margin: '40px 0' }}>
              <h2 style={{
                color: 'white',
                borderBottom: '3px solid red',
                display: 'inline-block',
                marginBottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'relative',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 28
              }}>BACKDROPS</h2>
              <Swiper
                slidesPerView={3}
                spaceBetween={4}
                style={{ padding: '20px 0', maxWidth: 1100, margin: '0 auto' }}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  600: { slidesPerView: 2 },
                  900: { slidesPerView: 3 },
                }}
              >
                {backdrops.map((img, idx) => (
                  <SwiperSlide key={idx} style={{ padding: 0, margin: 0 }}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${img.file_path}`}
                      alt={`Backdrop ${idx + 1}`}
                      style={{ width: '100%', borderRadius: 12, maxHeight: 500, objectFit: 'cover', margin: 0, padding: 0, display: 'block' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {/* Posters */}
          {posters && posters.length > 0 && (
            <div style={{ margin: '40px 0' }}>
              <h2 style={{
                color: 'white',
                borderBottom: '3px solid red',
                display: 'inline-block',
                marginBottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'relative',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 28
              }}>POSTERS</h2>
              <Swiper
                slidesPerView={3}
                spaceBetween={0}
                style={{ padding: '20px 0', maxWidth: 1100, margin: '0 auto' }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  600: { slidesPerView: 2 },
                  900: { slidesPerView: 3 },
                }}
                modules={[Autoplay]}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
              >
                {posters.slice(0, 10).map((img, idx) => (
                  <SwiperSlide key={idx} style={{ padding: 0, margin: 0 }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                      alt={`Poster ${idx + 1}`}
                      style={{ width: '100%', borderRadius: 8, marginBottom: 8 }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Hero Section للتفاصيل
  if (isMovie) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh', color: 'white' }}>
        {backdrop_path && (
          <div style={{
            backgroundImage: `url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 60%, #111 100%)', position: 'absolute', top: 0, left: 0, zIndex: 2 }}></div>
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 3, padding: '120px 0 0 0', maxWidth: 900, margin: '0 auto' }}>
          <h1 style={{ fontSize: 56, fontWeight: 700, marginBottom: 24 }}>{displayTitle}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
            {/* تقييم دائري */}
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #2ecc40', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: '#2ecc40', background: '#181818' }}>
              {vote_average ? vote_average.toFixed(1) : '-'}
            </div>
            {/* التصنيفات */}
            {genres && genres.map(genre => (
              <span key={genre.id} style={{ background: 'red', color: '#fff', borderRadius: 16, padding: '6px 18px', fontWeight: 700, fontSize: 16, marginRight: 8 }}>{genre.name}</span>
            ))}
          </div>
          {overview && (
            <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 32, maxWidth: 700 }}>{overview}</p>
          )}
          <button style={{ background: 'red', color: '#fff', border: 'none', borderRadius: 6, padding: '14px 32px', fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, cursor: 'pointer' }}>
            <FaPlay /> WATCH NOW
          </button>
        </div>
        {/* باقي البيانات */}
        <div style={{ position: 'relative', zIndex: 4, marginTop: 40 }}>
          {/* Cast */}
          {cast && cast.length > 0 && (
            <div className={styless['details-cast']}>
              <h3>Cast</h3>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'nowrap', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                {cast.slice(0, 4).map((actor) => (
                  <div
                    key={actor.id}
                    style={{ width: 170, height: 220, borderRadius: 8, overflow: 'hidden', background: '#222', position: 'relative', flex: '0 0 170px', cursor: 'pointer' }}
                    onClick={() => navigate(`/person/${actor.id}`)}
                  >
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                        alt={actor.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 32 }}>
                        <span>👤</span>
                      </div>
                    )}
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 40,
                      background: 'rgba(0,0,0,0.85)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      fontWeight: 600,
                      fontSize: 17,
                      letterSpacing: 0.2,
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                      textShadow: '0 1px 2px #000',
                    }}>
                      {actor.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Videos */}
          {videos && videos.length > 0 && (
            <div className={styless['details-videos']} style={{ margin: '40px 0' }}>
              <h2 style={{
                color: 'white',
                borderBottom: '3px solid red',
                display: 'inline-block',
                marginBottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'relative',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 28
              }}>VIDEOS</h2>
              <Swiper
                slidesPerView={3}
                spaceBetween={0}
                style={{ padding: '20px 0', maxWidth: 1100, margin: '0 auto' }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  600: { slidesPerView: 2 },
                  900: { slidesPerView: 3 },
                }}
                modules={[Autoplay]}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
              >
                {videos.filter(v => v.site === 'YouTube').map((video) => (
                  <SwiperSlide key={video.id}>
                    <div style={{ width: '100%', textAlign: 'center', background: '#111', borderRadius: 12, padding: 12 }}>
                      <a href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img
                          src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                          alt={video.name}
                          style={{ width: '100%', borderRadius: 8, marginBottom: 8 }}
                        />
                        <div style={{ fontWeight: 'bold', color: 'white', fontSize: 16, marginBottom: 4 }}>{video.name}</div>
                        <div style={{ color: '#aaa', fontSize: 13 }}>{video.type}</div>
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {/* Backdrops */}
          {backdrops && backdrops.length > 0 && (
            <div className={styless['details-backdrops']} style={{ margin: '40px 0' }}>
              <h2 style={{
                color: 'white',
                borderBottom: '3px solid red',
                display: 'inline-block',
                marginBottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'relative',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 28
              }}>BACKDROPS</h2>
              <Swiper
                slidesPerView={3}
                spaceBetween={4}
                style={{ padding: '20px 0', maxWidth: 1100, margin: '0 auto' }}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  600: { slidesPerView: 2 },
                  900: { slidesPerView: 3 },
                }}
              >
                {backdrops.map((img, idx) => (
                  <SwiperSlide key={idx} style={{ padding: 0, margin: 0 }}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${img.file_path}`}
                      alt={`Backdrop ${idx + 1}`}
                      style={{ width: '100%', borderRadius: 12, maxHeight: 500, objectFit: 'cover', margin: 0, padding: 0, display: 'block' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {/* Posters */}
          {posters && posters.length > 0 && (
            <div style={{ margin: '40px 0' }}>
              <h2 style={{
                color: 'white',
                borderBottom: '3px solid red',
                display: 'inline-block',
                marginBottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'relative',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 28
              }}>POSTERS</h2>
              <Swiper
                slidesPerView={3}
                spaceBetween={0}
                style={{ padding: '20px 0', maxWidth: 1100, margin: '0 auto' }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  600: { slidesPerView: 2 },
                  900: { slidesPerView: 3 },
                }}
                modules={[Autoplay]}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
              >
                {posters.slice(0, 10).map((img, idx) => (
                  <SwiperSlide key={idx} style={{ padding: 0, margin: 0 }}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                      alt={`Poster ${idx + 1}`}
                      style={{ width: '100%', borderRadius: 8, marginBottom: 8 }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default DetailsItem;