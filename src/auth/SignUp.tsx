import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../services/apiService";
export interface User {
    id?: string;
    firstName: string;
    userName: string;
    email: string;
    password: string;
}

function SignUp(){
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    function validate(): boolean {
        if (!firstName) {
            setError('*name is required');
            return false;
        }
        if (firstName.length<2) {
            setError('*name is too short');
            return false;
        }
        if (!password) {
            setError('*password is required');
            return false;
        }
        if (!email) {
            setError('*email is required');
            return false;
        }
        setError('');
        return true;
    }

    function handleClick() {
        if (!validate()) {
            return;
        }
        function onAdd(user: User) {
        signup(user)
            .then(json => {
                toast.success(`user ${json.firstName} has been added successfully`);
                navigate('/login')

            })
    }

        onAdd({
            firstName,
            userName,
            email,
            password,
          
        })
        setFirstName('')
        setEmail('')
        setPassword('')
    }
return(
<>
<div style={{paddingTop:'15vh'}}>
 <div className="w-75 mx-auto">
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="first name*"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="user name*"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            </div>
            <div className="row mb-3">
            <input
                className="form-control me-3 col"
                type="text"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="form-control me-3 col"
                type="password"
                placeholder="password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
             <div className="row mx-auto w-50 pb-3 gap-1">
            <div className="text-center text-danger">{error}</div>
            <button
                className={"btn btn-outline-success col w-50"}
            >
                <Link
                    to="/login"
                    className="nav-link"
                >
                    Cancel
                </Link>
            </button>
            <button
                className={"btn btn-outline-success col w-50"}
                onClick={handleClick}
            >
            add
            </button>
        </div>
        </div>
        </div>
        </>
)
}
export default SignUp;