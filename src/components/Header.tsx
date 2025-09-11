import React, { useContext, useEffect, useState } from "react";
import { verifyToken } from "../auth/TokenManager";
import Logout from "../auth/Logout";
import { getCurrentUser } from "../services/apiService";
import { AppContext } from "../App";
import './Header.css';

function Header(){
  const [userRole, setUserRole] = useState<string | null>(null);
  const context = useContext(AppContext);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-trekker">
        <div className="container">
          <a className="navbar-brand" href="#">Trekker</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              {context?.admin && context.verifyToken && <li className="nav-item">
                <a className="nav-link" href="/attractionView">Attrection View</a>
              </li>}
              {context?.verifyToken && <li className="nav-item">
                <a className="nav-link" href="/addAttraction">Add Attraction</a>
              </li>}
              {!context?.verifyToken && <li className="nav-item">
                <a className="nav-link" href="/login">login</a>
              </li>}
              {context?.verifyToken &&<Logout/>}
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default Header;