import React, { createContext, useContext } from 'react';
import LayOut from '../component/LayOut';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';


const LoginPage = () => {
const navigate=useNavigate()
  const handleSubmit =async(e)=> {
    e.preventDefault();

    try {
      const response=await fetch("http://localhost:4000/login",{
        method:"POST",
        body:JSON.stringify({userName,password}),
        headers:{"Content-Type":"application/json"},
        credentials:"include",
      })
      if(response.ok){
        alert("succesfuly logged in")
        response.json().then(info=>{
            setUserinfo(info); 
            
          }
        )
        
        
        navigate("/")
      }
      else{
        alert("failed")
      }

      
    } catch (error) {
      
    }
    // Add your login logic here
  };
  const[userName,setUserName]=useState("");    
  const[password,setPassword]=useState("");
  const[redirect,setRedirect]=useState(false);
  const {userInfo,setUserinfo}=useContext(userContext)

  const valueOfUserName=(e)=>{
    setUserName(e.target.value)
    console.log(userName)

  }
  const valueOfPassword=(e)=>{
    setPassword(e.target.value)
    console.log(password)

  }
  
  
  
  return (
    <>
      <LayOut />
      <div className="flex flex-col items-center justify h-screen gap-2">
        <h1 className="text-4xl font-bold ">Login</h1>
        <p className="text mb-4">Welcome to our website please login to continue</p>
        <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
            <h1 className='text-lg text-blue-500 font-bold'>userName</h1>
          <input 
            type="text"
            value={userName}
            onChange={valueOfUserName}
            placeholder="Username"
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
            aria-label="Username"
          />
            <h1 className='text-lg text-blue-500 font-bold'>password</h1>
            <input
            type="password"
            value={password}
            onChange={valueOfPassword}
            placeholder="Password"
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
  );
};

export default LoginPage;
