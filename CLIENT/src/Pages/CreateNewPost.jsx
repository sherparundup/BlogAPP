import React, { useState } from 'react';
import LayOut from '../component/LayOut';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from 'react-router-dom';


const CreateNewPost = () => {
    const navigate=useNavigate();
    const [tittle, setTittle] = useState("");
    const [description, setdescription] = useState("");
    const [file, setfile] = useState("");

    const tittleData = (e) => {
        setTittle(e.target.value);
        console.log(tittle);
    };

    const descData = (e) => {
        setdescription(e.target.value);
        console.log(description);
    };

    const handleClick=async(e)=>{
        e.preventDefault();
        const data=new FormData();
        data.set("tittle",tittle);
        data.set("description",description);
        data.set("file",file[0]);
        try {
           const response= await fetch("http://localhost:4000/createPost",{
                method:"POST",
                body:data,
                credentials:'include'

    
            }
            
        
        )
        if(response.ok){
            navigate("/")
                
        }
            
        } catch (error) {
            console.log(error,"here is the error")
            
        }
        




    }

    return (
        <>
            {/* <LayOut /> */}
            <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full transition-transform duration-300 transform ">
                    <h2 className="text-2xl font-bold mb-6 text-blue-500 pt-16">Create New Post</h2>
                    <form className="space-y-6" onSubmit={handleClick}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                onChange={tittleData}
                                value={tittle}
                                type="text"
                                placeholder="Title"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 transform "
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                            <input
                                type="file"
                                
                                onChange={(e)=>setfile(e.target.files)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 transform "
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                onChange={descData}
                                value={description}
                                placeholder="Description"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 transform "
                            ></textarea>
                        </div>

                       

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition duration-300 transform  active:scale-95"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateNewPost;
