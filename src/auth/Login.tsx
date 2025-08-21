import { createContext, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { login, signup } from "../services/apiService";
import { setAdmin, setToken, setUserID } from "./TokenManager";

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
    const [isAdmin , setIsAdmin] = useState(false);
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
                setIsAdmin(true)
                navigate('/');
            }).catch(()=>setError('invalid password or email'))
        setEmail('')
        setPassword('')
    }
return(
<>
<ToastContainer/>
<div className="row w-75 mx-auto pb-5" style={{paddingTop:'15vh'}}>
<div className="col-6"><img className="col-12 opacity-75" src="https://cdn.pixabay.com/photo/2017/01/28/02/24/japan-2014616_1280.jpg" alt="trekker" /></div>
<div className="col-6">
 <div className="w-75 mx-auto">
            <div className="row mb-3">
            <input
                className="form-control me-3 mb-3"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <input
                className="form-control me-3"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className="row">
            <div className="row text-center text-danger">{error}</div>
            <button
                className={"btn btn-outline-success w-50"}
                onClick={handleClick}
            >
            login
            </button>
            <button
                className={"btn btn-outline-success w-50"}
                onClick={()=>navigate('/signup')}
            >
            signup
            </button>
            </div>
        </div>
        </div>
        </div>
        </>
)
}
export default Login;