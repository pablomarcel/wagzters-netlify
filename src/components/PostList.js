//wagzters/src/components/PostList.js:

import React, { useState, useEffect } from 'react';
import Post from './Post';

const PostList = ({ email }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/.netlify/functions/getPosts?email=${email}`);
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
    }, [email]);

    return (
        <div className="post-list">
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;

