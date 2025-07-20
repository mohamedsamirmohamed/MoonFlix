import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = 'f1aca93e54807386df3f6972a5c33b50';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const PersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // بيانات الممثل
      const personRes = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`);
      const personData = await personRes.json();
      setPerson(personData);
      // أعمال الممثل
      const creditsRes = await fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`);
      const creditsData = await creditsRes.json();
      setMedias(creditsData.cast || []);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <div style={{color: 'white', textAlign: 'center', marginTop: 60}}>Loading...</div>;
  if (!person) return <div style={{color: 'white', textAlign: 'center', marginTop: 60}}>Not found</div>;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <img
          src={person.profile_path ? IMG_URL + person.profile_path : ''}
          alt={person.name}
          style={{ width: 240, height: 320, objectFit: 'cover', borderRadius: 8, background: '#222' }}
        />
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{ color: 'white', fontWeight: 700, fontSize: 28, marginBottom: 8 }}>{person.name} {person.birthday ? `(${person.birthday.slice(0,4)})` : ''}</h2>
          <p style={{ color: '#fff', fontSize: 16, lineHeight: 1.7 }}>{person.biography || 'No biography available.'}</p>
        </div>
      </div>
      <div style={{ marginTop: 48 }}>
        <h2 style={{ color: 'white', borderBottom: '3px solid red', display: 'inline-block', marginBottom: 20 }}>MEDIAS</h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {medias.filter(m => m.poster_path).slice(0, 12).map(media => (
            <div
              key={media.id}
              style={{ width: 180, borderRadius: 8, overflow: 'hidden', background: '#222', position: 'relative', cursor: 'pointer' }}
              onClick={() => navigate(`/${media.media_type}/${media.id}`)}
            >
              <img
                src={IMG_URL + media.poster_path}
                alt={media.title || media.name}
                style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '8px 10px',
                fontWeight: 'bold',
                fontSize: 15,
                textAlign: 'center',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}>
                {media.title || media.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonDetails; 