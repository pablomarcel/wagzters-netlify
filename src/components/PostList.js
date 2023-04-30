import React, { useState, useEffect } from 'react';
import Post from './Post';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    // Fetch posts data from API or static data for now
    useEffect(() => {
        // Replace with your API call later
        const fetchPosts = async () => {
            const data = [
                {
                    id: 1,
                    petName: 'Buddy',
                    ownerName: 'John',
                    content: 'Playing fetch in the park is my favorite!',
                    imageURL: 'https://i.imgur.com/KieXhJW.png',
                },
                // More posts...
            ];
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <div className="post-list">
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
