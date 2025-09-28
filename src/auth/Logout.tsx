import { useNavigate } from "react-router-dom";
import { removeAdmin, removeCity, removeDays, removeToken, removeTripPlan } from "./TokenManager";
import { NavDropdown } from "react-bootstrap";
function Logout() {
    
    function handleClick() {
        removeToken();
        removeTripPlan();
        removeCity();
        removeDays();
        window.location.reload();
    }

    return (
        <li className="nav-item">
            <button className="nav-link" onClick={handleClick}>logout</button>
        </li>
    );
}

export default Logout;