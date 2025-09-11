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
        <button
            className="btn btn-link nav-link"
            onClick={handleClick}
        >
            <NavDropdown.Item href="/login" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>Logout</NavDropdown.Item>
        </button>
    );
}

export default Logout;