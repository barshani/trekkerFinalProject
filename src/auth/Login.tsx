import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { login } from "../services/apiService";
import { setToken, setUserID, setAdminRole } from "./TokenManager";
import { AppContext } from "../App";
import './Login.css';

export interface loginUser {
    id?: string;
    firstName?: string;
    userName?: string;
    email: string;
    password: string;
    token?: string;
}
function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const context = useContext(AppContext);
    function validate(): boolean {
        if (!password) {
           setError('password is required');
           return false;
        }
        if (!email) 
        {
            setError('email is required');
            return false;
        }

        setError('');
        return true;
    }

    function handleClick() {
        if (!validate()) {
            return;
        }
         login({
            email,
            password
         })
            .then((user) => {
                setUserID(user.id)
                setToken(user.token)
                const isAdmin = user.role === 'admin';
                setAdminRole(isAdmin);
                console.log(context);
                if(context){
                    context.setAdmin(isAdmin);
                    context.setLoggedIn(true);
                    context.setVerifyToken(true);
                }
                navigate('/');
            }).catch(()=>setError('invalid password or email'))
        setEmail('')
        setPassword('')
    }
return(
<>
<ToastContainer/>
<div className="login-page">
    <div className="login-container">
        <div className="login-image-container">
            <img className="login-image" src="https://cdn.pixabay.com/photo/2017/01/28/02/24/japan-2014616_1280.jpg" alt="Scenic view of Japan" />
        </div>
        <div className="login-form-container">
            <div className="login-header">
                <h2>Welcome Back!</h2>
                <p>Sign in to continue to Trekker.</p>
            </div>
            <div>
                <div className="error-message">{error}</div>
                <div className="form-group">
                    <input
                        className="form-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button onClick={handleClick} className="btn btn-login">Login</button>
            </div>
            <div className="signup-link">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    </div>
</div>
</>
)
}
export default Login;