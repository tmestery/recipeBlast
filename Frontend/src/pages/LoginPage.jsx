// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import '../styles/auth.css'
//
// export default function LoginPage({setUserInfo}){
//     const [loginInfo, setLoginInfo] = useState({
//         username: "",
//         password: ""
//     })
//     const navigate = useNavigate()
//
//     function validateFields(){
//         if(!loginInfo.username || !loginInfo.password){
//             alert("All fields must be filled")
//             return false;
//         }
//         return true;
//     }
//
//     async function handleSubmit(event){
//         event.preventDefault()
//         try{
//             if(validateFields()){
//                 const response = await fetch("http://localhost:8080/login", {
//                     method: "POST",
//                     headers:
//                     {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify(loginInfo)
//                 })
//                 if(response.ok){
//                     setUserInfo((prev) => {
//                         return {...prev, username: loginInfo.username}
//                     })
//                     navigate('/')
//                 } else{
//                     alert("Username or Password was incorrect")
//                 }
//             }
//         } catch(error){
//             console.error(error.message)
//         }
//     }
//
//     function handleChange(event){
//         const {name, value} = event.target
//         setLoginInfo((prev) => {
//             const newFormData = {...prev, [name]:value}
//             console.log(newFormData)
//             return newFormData
//         })
//     }
//
//     return (
//         <div className="auth-background">
//             <div className="auth-container">
//                 <h1>Log In</h1>
//                 <form onSubmit={handleSubmit}>
//                     <label>Username</label>
//                     <input type="text" name="username" onChange={handleChange} />
//                     <label>Password</label>
//                     <input type="password" name="password" onChange={handleChange} />
//                     <input type="submit" value="Log In"/>
//                 </form>
//                 <Link to="/auth/signup">Don't have an account?</Link>
//             </div>
//         </div>
//     )
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ setUserInfo }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function validateFields() {
    if (!username || !password) {
      alert('All fields must be filled');
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password }),
      });

      if (response.ok) {
        setUserInfo(prev => ({ ...prev, username: username }));
        navigate('/');
      } else {
        alert('Username or Password was incorrect');
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom right, #DFFFD6, #B6F0C4, #8EE2B4)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        {/* Leaf Icon */}
        <div style={{
          marginBottom: '2rem',
          width: '60px',
          height: '60px',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '50%',
          background: 'linear-gradient(to bottom right, #38a169, #2f855a)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          color: 'white',
          fontWeight: 'bold'
        }}>
          🍃
        </div>

        {/* Title */}
        <h1 style={{ marginBottom: '0.5rem', color: '#2d3748' }}>Welcome Back</h1>
        <p style={{ marginBottom: '1.5rem', color: '#4a5568' }}>Sign in to continue</p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <label style={{ marginBottom: '0.25rem', color: '#2d3748' }}>Username</label>
            <input
              id="username"
              type="username"
              placeholder="Enter your username"
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #38a169'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <label style={{ marginBottom: '0.25rem', color: '#2d3748' }}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #38a169'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(to right, #38a169, #2f855a)',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{ marginTop: '1rem' }}>
          <a href="/auth/signup" style={{ color: '#38a169', textDecoration: 'underline', fontSize: '0.875rem' }}>
            Don't have an account?
          </a>
        </div>
      </div>
    </div>
  );
}
