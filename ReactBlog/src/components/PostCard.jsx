import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/appwriteconfig"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await appwriteService.getFilePreview(featuredImage);
                setImageUrl(response.href); // Assuming getFilePreview returns a response with an href property
            } catch (error) {
                console.error('Error fetching image preview:', error);
            }
        };

        fetchImage();
    }, [featuredImage]);

    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={imageUrl} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard