import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/auth.css'

export default function SignupPage(){
    const [signupInfo, setSignupInfo] = useState({
        email: "",
        username: "",
        password: ""
    })
    const navigate = useNavigate()

    function validateFields(){
        if(!signupInfo.email || !signupInfo.username || !signupInfo.password){
            alert("All fields must be filled")
            return false
        }
        return true
    }

    async function handleSubmit(event){
        event.preventDefault()
        try{
            if(validateFields()){
                const response = await fetch("http://localhost:8080/req/signup", {
                    method: "POST",
                    headers: 
                    {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(signupInfo)
                })
                if(response.ok){
                    navigate('/auth/login')
                }else{
                    alert(response.body)
                }
            }
        } catch(error){
            console.error(error.message)
        }
    }

    function handleChange(event){
        const {name, value} = event.target
        setSignupInfo((prev) => {
            const newFormData = {...prev, [name]:value}
            console.log(newFormData)
            return newFormData
        })
    }

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" name="email" onChange={handleChange} />
                <label>Username</label>
                <input type="text" name="username" onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} />
                <input type="submit" />
            </form>
            <Link to="/auth/login">Already have an account?</Link>
        </div>
    )
}