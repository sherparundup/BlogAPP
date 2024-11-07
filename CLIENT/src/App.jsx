import { useState } from 'react'
import './index.css'
import Post from './component/Post.jsx'
import Header from './component/Header.jsx'
import { Route, Routes } from 'react-router-dom'
import LayOut from './component/LayOut.jsx'
import HomePage from './Pages/HomePage.jsx'
import LOginPage from './Pages/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import CreateNewPost from "./Pages/CreateNewPost.jsx"
import { UserConntextProvider } from './context/userContext.jsx'

function App() {
  return (
    <UserConntextProvider>

    <Routes>
      <Route path="/" element={<LayOut />} ></Route>
      <Route index element={<HomePage/>}></Route>
      <Route path={"/login"} element={<LOginPage/> }></Route>
      <Route path={"/Register"} element={<RegisterPage/>}></Route>
      <Route path={"/createPost"} element={<CreateNewPost/>}></Route>


    </Routes>
    </UserConntextProvider>
  )


}

export default App
