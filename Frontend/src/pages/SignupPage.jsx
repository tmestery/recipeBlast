import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'

export default function SignupPage(){
    const [signupInfo, setSignupInfo] = useState({
        email: "",
        username: "",
        password: ""
    })

    async function handleSubmit(event){
        event.preventDefault()
    }

    function handleChange(event){
        const {name, value} = event.target
        setSignupInfo((prev) => {
            console.log({...prev, [name]:value})
            return {...prev, [name]:value}
        })
    }

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" onChange={handleChange} />
                <label>Username</label>
                <input type="text" onChange={handleChange} />
                <label>Password</label>
                <input type="password" onChange={handleChange} />
                <input type="submit" />
            </form>
            <Link to="/auth/login">Already have an account?</Link>
        </div>
    )
}