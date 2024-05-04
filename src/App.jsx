import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import Home from './routes/Home';
import BookDetails from './routes/BookDetails';
import AdminLogin from './routes/AdminLogin';
import Root from './routes/Root';
import Error from './routes/Error';
import AdminDashboard from './routes/AdminDashboard';
import DataFetcher from './components/DataFetcher';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';



function App() {
  const [data, setData] = useState([]);

  const router = createBrowserRouter([
    { 
      path: '/', 
      element: <Root />, 
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: '/bookdetails', element: <BookDetails data={data}/>},
        { path: '/admin-login', element: <AdminLogin /> },
        { path: '/admin-dashboard', element: (
            <PrivateRoute>
              <AdminDashboard data={data} setData={setData}/>
            </PrivateRoute>
          ) 
        }
      ]
    }
  ]);

  return (
    <AuthProvider>
      <DataFetcher setData={setData} />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
