import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/auth.css'

export default function LoginPage(){
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate()

    function validateFields(){
        if(!loginInfo.username || !loginInfo.password){
            alert("All fields must be filled")
            return false;
        }
        return true;
    }

    async function handleSubmit(event){
        event.preventDefault()
        try{
            if(validateFields()){
                const response = await fetch("http://localhost:8080/login", {
                    method: "POST",
                    headers: 
                    {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginInfo)
                })
                if(response.ok){
                    navigate('/')
                } else{
                    alert("Username or Password was incorrect")
                }
            }
        } catch(error){
            console.error(error.message)
        }
    }

    function handleChange(event){
        const {name, value} = event.target
        setLoginInfo((prev) => {
            const newFormData = {...prev, [name]:value}
            console.log(newFormData)
            return newFormData
        })
    }

    return (
        <div className="auth-container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} />
                <input type="submit" />
            </form>
            <Link to="/auth/signup">Don't have an account?</Link>
        </div>
    )
}