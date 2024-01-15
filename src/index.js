import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';
import WeatherPage from './pages/WeatherPage';
import BusPage from './pages/BusPage';
import SubwayPage from './pages/SubwayPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const routes = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<NotFound/>,

    children:[
      {path:'/weatherHour',element:<WeatherPage/>},
      {path:'/subway',element:<SubwayPage/>},
      {path:'/bus',element:<BusPage/>},
    ]
  }
])
root.render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
