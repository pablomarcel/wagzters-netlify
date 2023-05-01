// wagzters/src/pages/Create.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import '../bootstrap-5.2.3-dist/css/bootstrap.min.css';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import CreatePostForm from '../components/CreatePostForm';

const Create = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
    const { user } = useAuth0();

    const checkAndCreatePetOwner = async () => {
        try {
            await axios.post(`${API_BASE_URL}/.netlify/functions/checkAndCreatePetOwner`, {
                ownerEmail: user.email,
            });
        } catch (error) {
            console.error('Error checking and creating pet owner', error);
        }
    };

    const handleCreatePost = async (postData) => {
        try {
            await axios.post(`${API_BASE_URL}/.netlify/functions/createPost`, {
                ...postData,
                ownerEmail: user.email,
            });
            alert('Post created successfully');
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    useEffect(() => {
        checkAndCreatePetOwner();
    }, []);

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h2>Create Pet Owner</h2>
                        </div>
                        <div className="card-body">
                            {/* The owner creation form has been removed */}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h2>Create Post</h2>
                        </div>
                        <div className="card-body">
                            <CreatePostForm onCreate={handleCreatePost} userEmail={user.email} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuthenticationRequired(Create, {
    onRedirecting: () => <div>Loading...</div>,
});
