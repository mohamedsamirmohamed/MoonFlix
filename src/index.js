import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { MovieProvider } from './components/MovieContext/MovieContext.js';
import { MoviesProvider } from './components/MoviesContext/MoviesContext.js';
import { ClerkProvider } from '@clerk/clerk-react';
import { DetailsItemProvider } from './components/DetailsContxt/DetailsItemContext.js';

// قراءة مفتاح النشر من متغير البيئة
const PUBLISHABLE_KEY = "pk_test_c3F1YXJlLXF1YWlsLTQ2LmNsZXJrLmFjY291bnRzLmRldiQ";



if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <DetailsItemProvider>
 <MoviesProvider>
        <MovieProvider>
          <App />
        </MovieProvider>
      </MoviesProvider>
      </DetailsItemProvider>
     
    </ClerkProvider>
  </React.StrictMode>
);

reportWebVitals();
