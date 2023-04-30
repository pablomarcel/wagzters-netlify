import React from 'react';

const Post = ({ post }) => {
    return (
        <div className="post">
            <h3>{post.petName} (by {post.ownerName})</h3>
            <img src={post.imageURL} alt={`Photo of ${post.petName}`} />
            <p>{post.content}</p>
        </div>
    );
};

export default Post;
