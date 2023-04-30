/* eslint-disable no-unused-vars */

import React from 'react';

const Post = ({ post }) => {
    return (
        <div className="post">
            <h3>{post.petName} (by {post.ownerName})</h3>
            {/* eslint-disable jsx-a11y/img-redundant-alt */}
            <img src={post.imageURL} alt={`Photo of ${post.petName}`} />
            <p>{post.content}</p>
        </div>
    );
};

export default Post;
