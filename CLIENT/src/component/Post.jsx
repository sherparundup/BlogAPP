import React from 'react';

const Post = ({ data }) => {
  return (
    <div className='flex justify-center mb-16'>
      {/* Image */}
      <img className='max-w-md' src={`http://localhost:4000/${data.file}`} alt="picture" />
      
      {/* Post Content */}
      <div className='flex-col p-10'>
        <h1 className='text-3xl font-bold'>{data.tittle}</h1>
        
        {/* Post Info */}
        <p className='mt-3 pb-7 font-bold text-s text-[#888]'>
        <a href="#" className="text-gray-800 pr-3">{data.author?.userName || "Unknown Author"}</a>
        <time dateTime={data.updatedAt}>{new Date(data.updatedAt).toLocaleString()}</time>
        </p>
        
        {/* Description */}
        <p>{data.description}</p>
      </div>
    </div>
  );
}

export default Post;
