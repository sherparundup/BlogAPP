import React, { useEffect, useState } from 'react'
import Post from '../component/Post'
import LayOut from '../component/LayOut'
import Header from '../component/Header'
const HomePage = () => {
  const [post,setPost]=useState([]);
  useEffect(()=>{
   const response= fetch("http://localhost:4000/createPost",{
    credentials:"include"
   }).then(
      res=> res.json().then(
        ok=>setPost(ok),
      
      ),
      
      
    )

  },[])
  


  return (
    <>
    <LayOut/>
    {post.length>0 ? post.map((data)=>
      <Post key={data._id} data={data}></Post>
    ):
    <p>No posts available</p>}
     
    {/* {post.length>0 && post.map((post)=>(

      <Post key={post._id}></Post>
     
    )
    )} */}
         
    
    </>
  )
}

export default HomePage