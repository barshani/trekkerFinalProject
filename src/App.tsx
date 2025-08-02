import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import CountryPage from './Pages/CityPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import AttractionPage from './Pages/AttractionPage';
import HomePage from './Pages/HomePage';
import PlanPage from './Pages/PlanPage';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/countryPage" element={<CountryPage />} />
            <Route path="/plan/:city/:days" element={<PlanPage />} />
            <Route path="/attractionPage/:cityname/:day" element={<AttractionPage/>} 
            />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
    
  );
}

export default App;
