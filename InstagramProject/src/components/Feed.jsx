/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

   useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token'); 
    
      try {
        const response = await fetch('http://localhost:3001/api/posts/feed', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        const data = await response.json();
    
        if (response.ok) {
          setPosts(data); // Guardar los posts en el estado
        } else {
          setError('Error al cargar los posts');
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
    
  }, []);

  if (loading) {
    return <p>Cargando posts...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    
    <div className="feed-container">
      {posts.length === 0 ? (
        <p>No hay posts para mostrar.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="post">
            <div className="post-header">
              <h4>{post.username}</h4>
              <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <div className="post-image">
              <img src={post.imageUrl} alt="Post" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;