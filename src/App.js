import { Route, Routes } from 'react-router-dom';
import './App.css';
import Head from './components/Head';
import GlobalStyle from './style/GlobalStyle';
import MainPage from './pages/MainPage';
import IndexList from './components/IndexList';
import WeatherPage from './pages/WeatherPage';

function App() {
  //안드로이드 한 화면 크기 : 360 x 800
  return (
    <>
    <GlobalStyle/>
    <Head/>
    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/weatherHour' element={<WeatherPage/>}/>
    </Routes>
    <IndexList/>
    </>
  );
}

export default App;
