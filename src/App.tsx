import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import CountryPage from './Pages/CityPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import AttractionPage from './Pages/AttractionPage';
import HomePage from './Pages/HomePage';
import PlanPage from './Pages/PlanPage';
import RouteGuard from './auth/RouteGuard';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
function App() {
  return (
    <>
    <BrowserRouter>
        <Header />
          <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/city" element={
            <RouteGuard>
              <CountryPage />
            </RouteGuard>
              } />
            <Route path="/plan/:city/:days" element={
                <RouteGuard>
              <PlanPage />
                </RouteGuard>
              } />
            <Route path="/attractionPage/:cityname/:day" element={
              <RouteGuard>
              <AttractionPage/>
              </RouteGuard>
              } />
          </Routes>
        <Footer />
        </BrowserRouter>
    </>
    
  );
}

export default App;
