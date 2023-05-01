//wagzters/src/components/CreatePostForm.js:

import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

const CreatePostForm = ({ onCreate, userEmail }) => {
    const [content, setContent] = useState('');
    const [imageURL, setImageURL] = useState('');

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate({ content, imageURL, ownerEmail: userEmail });
        setContent('');
        setImageURL('');
    };

    const handleImageUpload = (url) => {
        setImageURL(url);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="Share your thoughts about your pet..."
            />
            <ImageUpload onUpload={handleImageUpload} />
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePostForm;

