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
import AddAttractionPage from './Pages/AddAttractionPage';
import AttractionView from './Pages/AttractionView';
import { getAdmin, verifyToken } from './auth/TokenManager';
import { createContext, useState } from 'react';

interface Context {
      admin: boolean
      setAdmin: Function
      loggedIn: boolean
      setLoggedIn: Function
      verifyToken: boolean
      setVerifyToken: Function
  }
  const initalState={
     admin:(getAdmin()==="yes"?true:false),
     setAdmin:()=>{},
     loggedIn:(verifyToken()),
     setLoggedIn:()=>{},
     verifyToken: (verifyToken()),
     setVerifyToken:()=>{}
}
export const AppContext = createContext<Context | null>(initalState);
function App() {
  const [admin, setAdmin] = useState(initalState.admin);
  const [loggedIn, setLoggedIn] = useState(initalState.loggedIn);
  const [verifyToken, setVerifyToken] = useState(initalState.verifyToken);
  return (
    <>
    <BrowserRouter>
      <AppContext.Provider value={{ admin, setAdmin, loggedIn, setLoggedIn, verifyToken, setVerifyToken }}>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/city" element={<RouteGuard><CountryPage /></RouteGuard>} />
              <Route path="/plan/:city/:days" element={<RouteGuard><PlanPage /></RouteGuard>} />
              <Route path="/attractionPage/:cityname/:day" element={<RouteGuard><AttractionPage/></RouteGuard>} />
              <Route path="/addAttraction" element={<RouteGuard><AddAttractionPage /></RouteGuard>} />
              <Route path="/attractionView" element={<RouteGuard><AttractionView /></RouteGuard>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AppContext.Provider>
    </BrowserRouter>
    </>
    
  );
}

export default App;
