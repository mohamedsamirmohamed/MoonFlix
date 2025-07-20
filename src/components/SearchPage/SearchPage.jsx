import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'f1aca93e54807386df3f6972a5c33b50';

const SearchPage = () => {
  const [tab, setTab] = useState('movie');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // البحث التلقائي مع debounce
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const handler = setTimeout(async () => {
      let url = '';
      if (tab === 'movie') url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`;
      if (tab === 'tv') url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`;
      if (tab === 'people') url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    }, 500); // نصف ثانية
    return () => clearTimeout(handler);
  }, [searchTerm, tab]);

  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '40px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 24 }}>
        <button onClick={() => setTab('movie')} style={{ background: tab === 'movie' ? 'red' : 'transparent', color: tab === 'movie' ? '#fff' : '#eee', border: 'none', fontWeight: 700, fontSize: 18, borderRadius: 6, padding: '8px 28px', cursor: 'pointer', letterSpacing: 1 }}>MOVIE</button>
        <button onClick={() => setTab('tv')} style={{ background: tab === 'tv' ? 'red' : 'transparent', color: tab === 'tv' ? '#fff' : '#eee', border: 'none', fontWeight: 700, fontSize: 18, borderRadius: 6, padding: '8px 28px', cursor: 'pointer', letterSpacing: 1 }}>TV</button>
        <button onClick={() => setTab('people')} style={{ background: tab === 'people' ? 'red' : 'transparent', color: tab === 'people' ? '#fff' : '#eee', border: 'none', fontWeight: 700, fontSize: 18, borderRadius: 6, padding: '8px 28px', cursor: 'pointer', letterSpacing: 1 }}>PEOPLE</button>
      </div>
      <form onSubmit={e => e.preventDefault()} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search MoonFlix"
          style={{ width: '100%', padding: 16, fontSize: 18, borderRadius: 6, border: '1px solid #444', outline: 'none', background: '#111', color: '#fff', marginBottom: 24 }}
          autoFocus
        />
      </form>
      {loading && <div style={{ color: '#fff', marginTop: 16 }}>Loading...</div>}
      {results.length > 0 && (
        <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'flex-start' }}>
          {results.map(item => (
            <div
              key={item.id}
              style={{ width: 170, background: '#222', borderRadius: 8, overflow: 'hidden', color: '#fff', textAlign: 'center', fontSize: 15, cursor: 'pointer' }}
              onClick={() => {
                if (item.media_type === 'movie' || tab === 'movie') navigate(`/movie/${item.id}`);
                else if (item.media_type === 'tv' || tab === 'tv') navigate(`/tv/${item.id}`);
                else if (item.media_type === 'person' || tab === 'people') navigate(`/person/${item.id}`);
              }}
            >
              {item.poster_path || item.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path || item.profile_path}`}
                  alt={item.title || item.name}
                  style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{ width: '100%', height: 220, background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 32 }}>
                  <span>👤</span>
                </div>
              )}
              <div style={{ padding: 8 }}>{item.title || item.name}</div>
            </div>
          ))}
        </div>
      )}
      {!loading && results.length === 0 && searchTerm && (
        <div style={{ color: '#fff', marginTop: 16 }}>No results found.</div>
      )}
    </div>
  );
};

export default SearchPage; 