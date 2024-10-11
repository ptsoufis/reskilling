// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the post data based on the post ID
        axios.get(`http://localhost:5000/post/${id}`)
            .then(response => {
                setPost(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch post');
                setLoading(false);
            });

        // Fetch the photo URL based on the post ID
        axios.get('http://localhost:5000/photos')
            .then(response => {
                const photo = response.data.find(photo => photo.id === parseInt(id));
                if (photo) {
                    setPhotoUrl(photo.url);
                }
            })
            .catch(() => {
                console.error('Failed to fetch photos');
            });
    }, [id]);

    if (loading) {
        return <div>Loading post...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="relative px-12"> 
            {/* Navigation Bar */}
            <nav className="flex justify-between items-center p-4 text-black">
                <div className="text-xl font-bold">Site Name</div>
                <div className="flex space-x-6 ml-12">
                    <a href="#Page" className="hover:underline">Page</a>
                    <a href="#Page" className="hover:underline">Page</a>
                    <a href="#Page" className="hover:underline">Page</a>
                    <button className="bg-black text-white px-4 py-0.5 rounded hover:bg-blue-200">Button</button>
                </div>
            </nav>

            {/* Split the page into two halves */}
            <div className="flex flex-row mt-8">
                {/* Left side: Post title and body */}
                <div className="w-1/2 p-4">
                    <h1 className="text-4xl font-bold mb-4 text-left">Single Post</h1>
                    <p className="text-lg mt-4">{post.body}</p>
                </div>

                {/* Right side: Fetched photo */}
                <div className="w-1/2 p-4">
                    {photoUrl && (
                        <img src={photoUrl} alt="Post" className="w-full h-auto object-cover" />
                    )}
                </div>
            </div>

            {/*Divider*/}
            <div className="border-t border-gray-300 my-8"></div>

            {/* Footer */}
                    <footer className="flex justify-between p-4 bg-white-100">
                        {/* Left Half */}
                        <div className="flex flex-col">
                            <div className="text-left text-xl font-bold">Site Name</div>
                            <div className="flex gap-4 mt-auto">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>

                        {/* Right Half with smaller right-side gap */}
                        <table className="border-collapse w-1/2 text-left"> 
                            <thead>
                                <tr>
                                    <th className="p-2">Topic</th>
                                    <th className="p-2">Topic</th>
                                    <th className="p-2">Topic</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 3 }, (_, index) => (
                                    <tr key={index}>
                                        <td className="p-2">Page</td>
                                        <td className="p-2">Page</td>
                                        <td className="p-2">Page</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </footer>
        </div>
    );
}

export default SinglePost;
