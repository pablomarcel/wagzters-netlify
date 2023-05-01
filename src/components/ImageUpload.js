import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const ImageUpload = ({ onUpload }) => {
    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const fileName = uuidv4();
        const fileType = file.type;

        const response = await axios.post('/.netlify/functions/signS3', {
            fileName,
            fileType,
        });

        const { signedRequest, url } = response.data;

        await axios.put(signedRequest, file, {
            headers: {
                'Content-Type': fileType,
            },
        });

        onUpload(url);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
    );
};

export default ImageUpload;
