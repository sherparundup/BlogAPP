import React, { useState } from 'react'
import LayOut from '../component/LayOut'
import { Navigate, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate=useNavigate()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const valueOfUserName=(e)=>{
    setUserName(e.target.value)
    console.log(userName)

  }
  const valueOfPassword=(e)=>{
    setPassword(e.target.value)
    console.log(password)

  }
  const handleSubmit=async(event)=>{
  event.preventDefault(); 
  try {
    
   const response= await fetch("http://localhost:4000/Register",{
      method:"POST",
      body:JSON.stringify({userName,password}),
      headers:{"Content-Type":"application/json"},
      
    }
  )
  if (response.ok) {
    alert("Registration successful");
    console.log("Registration is working");
    navigate("/"); // Navigate to the home route on success
  } else {
    console.log("Failed to register");
    // Handle registration failure
  }
} 
catch (error) {
  console.log(error)
  alert(error)
  
}

  }
  return (<>
    <LayOut />
    <div className="flex flex-col items-center justify h-screen gap-2">
      <h1 className="text-4xl font-bold ">Register</h1>
      <p className="text mb-4">Welcome to our website please Register to continue</p>
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
        <h1 className='text-lg text-blue-500 font-bold'>userName</h1>
        <input value={userName}
          onChange={valueOfUserName}
          type="text"
          placeholder="Username"
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          aria-label="Username"
        />
        <h1 className='text-lg text-blue-500 font-bold'>password</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={valueOfPassword}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          aria-label="Password"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Form
        </button>
      </form>
    </div>
  </>
  )
}

export default RegisterPage