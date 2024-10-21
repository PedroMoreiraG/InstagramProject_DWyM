/* eslint-disable no-unused-vars */
import React from 'react';

const Post = ({ post }) => {
    return (
        <div className="post">
            <h3>{post.username}</h3>
            <img src={post.image} alt={post.description} />
            <p>{post.description}</p>
        </div>
    );
};

export default Post;