import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Movies from './components/Movies/Movies';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import DetailsItem from './components/DetailsItem/DetailsItem';
import PersonDetails from './components/PersonDetails/PersonDetails';
import SearchPage from './components/SearchPage/SearchPage';
import TVSeries from './components/TVSeries/TVSeries';


function App() {
// هنا بنعمل كومبوننت صغير جوه الملف مباشرة
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};
const routers = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'movies', element: <Movies /> },
      { path: 'movie/:id', element: <DetailsItem /> },
      { path: 'tv/:id', element: <DetailsItem /> }, // أضفنا هذا السطر
      { path: 'details', element: <DetailsItem /> }, // أضفنا هذا السطر
      { path: 'person/:id', element: <PersonDetails /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'series', element: <TVSeries /> },
    ],
  },
]);


  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
