// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  
  const [photos, setPhotos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorPhotos, setErrorPhotos] = useState(null);
  const [errorPosts, setErrorPosts] = useState(null);

  // Fetch photos and posts when the component mounts
  useEffect(() => {
    // Fetch photos
    axios.get('http://localhost:5000/photos')
      .then(response => {
        setPhotos(response.data);
        setLoadingPhotos(false);
      })
      .catch(() => {
        setErrorPhotos('Failed to fetch photos');
        setLoadingPhotos(false);
      });

    // Fetch posts
    axios.get('http://localhost:5000/posts')
      .then(response => {
        setPosts(response.data);
        setLoadingPosts(false);
      })
      .catch(() => {
        setErrorPosts('Failed to fetch posts');
        setLoadingPosts(false);
      });
  }, []);
  
  if (loadingPhotos) {
    return <div>Loading photos...</div>;
  }
  if (errorPhotos) {
    return <div>{errorPhotos}</div>;
  }
  
  if (loadingPosts) {
    return <div>Loading posts...</div>;
  }
  if (errorPosts) {
    return <div>{errorPosts}</div>;
  }

  return (
    <div className="relative w-full h-full bg-white px-6"> 
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 text-black max-w-screen-lg mx-auto"> 
        <div className="text-xl font-bold">Site Name</div>
        <div className="flex space-x-6 ml-12">
          <a href="#Page" className="hover:underline">Page</a>
          <a href="#Page" className="hover:underline">Page</a>
          <a href="#Page" className="hover:underline">Page</a>
          <button className="bg-black text-white px-4 py-0.5 rounded hover:bg-blue-200">
            Button
          </button>
        </div>
      </nav>

      {/* Article Section for Posts */}
      <div className="flex flex-col justify-center items-start mt-6 gap-6 mb-8 max-w-screen-lg mx-auto"> 
        <h1 className="text-5xl font-bold">Post List</h1>
        <h2 className="text-2xl font-semibold w-1/2 leading-6">
          Subheading that sets up context, shares more info about the author or generally gets people psyched to keep reading.
        </h2>
      </div>

      {/* Hero Image */}
      <div className="max-w-screen-lg mx-auto"> 
        {photos.length > 0 && (
          <img
            src={photos[0].url}
            alt="Hero"
            className="w-full h-[50vh] object-cover" 
          />
        )}
      </div>

      {/* Dynamic Paragraph based on the first photo's corresponding post */}
      <div className="flex justify-center mt-4 px-4 max-w-screen-lg mx-auto">
        {photos.length > 0 && posts.length > 0 && (
          <p className="text-center max-w-4xl text-lg leading-7">
            {posts.find(post => post.id === photos[0].id)?.body || 'No post content available for this photo.'}
          </p>
        )}
      </div>

      {/* Dynamic Rendering for Two Smaller Photos without Titles/Authors */}
      <div className="flex justify-between mt-4 max-w-screen-lg mx-auto"> 
        {photos.slice(1, 3).map((photo, index) => (
          <div key={index} className="w-1/2 mx-4">
            <img
              src={photo.url}
              alt={`Image for photo ${index + 1}`}
              className="w-full h-72 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dynamic Paragraph Below the Two Photos based on their corresponding posts */}
      <div className="flex flex-col justify-center items-center mt-4 px-4 max-w-screen-lg mx-auto">
        {photos.slice(1, 3).map((photo, index) => (
          <p key={index} className="text-center max-w-4xl text-lg leading-7 mt-4">
            {posts.find(post => post.id === photo.id)?.body || 'No post content available for this photo.'}
          </p>
        ))}
      </div>

      {/* Related articles section */}
      <div className="max-w-screen-lg mx-auto mt-8"> 
        <h2 className="text-4xl font-bold text-left">Related articles or posts</h2> 
      </div>

      {/* Dynamic Grid for Nine Pictures with Titles and Authors */}
      <div className="max-w-screen-lg mx-auto mt-4"> 
        <div className="grid grid-cols-3 gap-x-3 gap-y-4"> 
          {photos.slice(3, 12).map(photo => (
            <div className="flex flex-col items-start" key={photo.id}>
              <a href={`/post/${photo.id}`}>
                <img
                  src={photo.url}
                  alt={`Image for post ${photo.id}`}
                  className="w-full h-72 object-cover"
                />
              </a>
              <h3 className="mt-2 w-full text-left"><strong>Title : </strong>{photo.title}</h3>
              <p className="text-sm mt-1 w-full text-left"><strong>Author Name :</strong> {photo.id}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider before Footer */}
      <hr className="my-8 border-t border-gray-300 max-w-screen-lg mx-auto" /> 

      {/* Footer */}
      <footer className="flex justify-between items-stretch p-4 bg-white mt-8 max-w-screen-lg mx-auto"> 
        <div className="flex flex-col justify-between">
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

        <table className="w-1/2 text-left">
          <thead>
            <tr>
              <th className="font-bold">Topic</th>
              <th className="font-bold">Topic</th>
              <th className="font-bold">Topic</th>
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

export default Home;
