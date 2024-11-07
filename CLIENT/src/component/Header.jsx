  import React, { useContext, useEffect,useState } from 'react'
  import { Link } from 'react-router-dom'
  import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';

  const Header = () => {
    const navigate=useNavigate()
    const {setUserinfo}=useContext(userContext)
    const {userInfo}=useContext(userContext)
    const userName=userInfo?.userName

    useEffect(()=>{
      fetch("http://localhost:4000/profile",{
      credentials:"include" }).then((response)=>{
        response.json().then((userInformation)=>{
          setUserinfo(userInformation)
        })
      })  
      },[])

    const logOut=async(e)=>{
      e.preventDefault();
      console.log("hi")
      await fetch("http://localhost:4000/logout",{credentials:'include',
        method:"POST"
      })
      // console.log("hi")
      // navigate("/")
      setUserinfo(null)


    }
    
    return (
  <header className='flex justify-between mb-32 '>
          <Link to="/" className="text-lg font-bold">MYBLOG</Link>
          <nav className="flex gap-10 px-20 ">
            {userName ?(<div className='text-black pt-10 flex gap-9 text-lg font-bold '>
            <Link to="/createPost" >create new post</Link>
            <button onClick={logOut}>Logout</button>
            </div>):(<>
              <Link className="text-gray-700" to="/login">login</Link>
              <Link className='text-black' to="/Register">register</Link>
            </>
            ) 
            }
          </nav>
        </header>  )
  }

  export default Header