import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './YandexDiskUploader.css'

const YandexDiskUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileDrop = (acceptedFiles) => {
        setSelectedFiles(acceptedFiles);
    };

    const handleUpload = async () => {
        // Set your Yandex.Disk access token
        const accessToken = 'YOUR_YANDEX_DISK_ACCESS_TOKEN';

        for (const file of selectedFiles) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                await axios.post(`https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(file.name)}`, formData, {
                    headers: {
                        Authorization: `OAuth ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(`File "${file.name}" uploaded successfully!`);
            } catch (error) {
                console.error(`Error uploading file "${file.name}":`, error);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: '*',
        maxFiles: 100,
        onDrop: handleFileDrop,
    });

    return (
        <div className='upload_wrapper'>
            {
                !selectedFiles.length && (
                    <div className='dropzone' {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()}  />
                        <p>Выберите файлы.</p>
                    </div>
                )
            }

            {selectedFiles.length > 0 && (
                <div>
                    <h2>Выбранные файлы:</h2>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>{index + 1 + '. '}{file.name}</li>
                        ))}
                    </ul>
                    <button className='btn' onClick={handleUpload}>Загрузить в Yandex.Disk</button>
                </div>
            )}
        </div>
    );
};

export default YandexDiskUploader;
