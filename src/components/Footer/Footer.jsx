import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return <>
<footer
  className="bg-dark text-white w-100"
  style={{
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 999,
    padding: '0.3rem 0',  // تقليل التباعد العمودي
    fontSize: '0.8rem',   // تصغير حجم الخط الأساسي للفوتر
  }}
>
  <div className="container-fluid px-3">
    <div className="row align-items-center text-center text-md-start">
      {/* لوجو MoonFlix */}
      <div className="col-12 col-md-6 mb-1 mb-md-0">
        <h3 className="m-0" style={{ color: '#ff0000', fontSize: '1rem' }}>
          Moon<span style={{ color: '#ffffff' }}>Flix</span>
        </h3>
      </div>

      {/* روابط التنقل */}
      <div className="col-12 col-md-6 text-center text-md-end">
        <Link to="/" className="text-white me-2 d-inline-block" style={{ fontSize: '0.8rem' }}>HOME</Link>
        <Link to="/movies" className="text-white me-2 d-inline-block" style={{ fontSize: '0.8rem' }}>MOVIES</Link>
        <Link to="/tv-series" className="text-white me-2 d-inline-block" style={{ fontSize: '0.8rem' }}>TV SERIES</Link>
        <Link to="/search" className="text-white d-inline-block" style={{ fontSize: '0.8rem' }}>SEARCH</Link>
      </div>
    </div>
  </div>
</footer>



  </>
}
