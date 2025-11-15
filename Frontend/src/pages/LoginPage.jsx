import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'

export default function LoginPage(){
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    })

    async function handleSubmit(event){
        event.preventDefault()
    }

    function handleChange(event){
        const {name, value} = event.target
        setLoginInfo((prev) => {
            console.log({...prev, [name]:value})
            return {...prev, [name]:value}
        })
    }

    return (
        <div className="auth-container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" onChange={handleChange} />
                <label>Password</label>
                <input type="password" onChange={handleChange} />
                <input type="submit" />
            </form>
            <Link to="/auth/signup">Don't have an account?</Link>
        </div>
    )
}