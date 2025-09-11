import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../services/apiService";
import './SignUp.css';
export interface User {
    id?: string;
    firstName: string;
    userName: string;
    email: string;
    password: string;
    role?: string;
}

function SignUp(){
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    function validate(): boolean {
        if (!firstName || !userName || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
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
            role: 'user'
        })
        setFirstName('')
        setEmail('')
        setPassword('')
    }
return(
    <div className="signup-page">
        <div className="signup-card">
            <div className="signup-header">
                <h2>Create Your Account</h2>
            </div>
            <div className="signup-body">
                <form onSubmit={(e) => { e.preventDefault(); handleClick(); }}>
                    <div className="error-message">{error}</div>
                    <div className="input-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" className="form-input" type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userName">Username</label>
                            <input id="userName" className="form-input" type="text" placeholder="john.d" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" className="form-input" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" className="form-input" type="password" placeholder="6+ characters" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input id="confirmPassword" className="form-input" type="password" placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="button-group">
                        <Link to="/login" className="btn btn-cancel">Cancel</Link>
                        <button type="submit" className="btn btn-signup">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)
}
export default SignUp;