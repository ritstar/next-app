import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import loadingIcon from '../../public/Infinity-loading.svg';
require('dotenv').config();

export default function YoutubeVideoDownload() {
    const [url, setUrl] = useState('');
    const [videoData, setVideoData] = useState<any[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        setIsLoading(true);
        const response = await axios.post(
            `${process.env.CYCLIC_URL}/YoutubeVideoDownload?url=${url}`, FormData,
            {
                headers: {
                  'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
                  'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log(response);
        const data = await response.data;
        setVideoData(data.formats);
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl mb-4">Youtube Video Downloader</h1>
                <form onSubmit={handleSubmit} className="mb-8">
                    <input
                        type="text"
                        placeholder="Enter Youtube video URL"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        className="p-2 border rounded w-64"
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded mt-2">Get Download Links</button>
                </form>
                {isLoading && (
                    <Image src={loadingIcon} alt="loading..."/> // Replace this with your loading SVG
                )}
                {videoData && (
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Format</th>
                                <th className="px-4 py-2">Quality</th>
                                <th className="px-4 py-2">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videoData.map((format, index) => (
                                format.qualityLabel && (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{format.mimeType.split('/')[1].split(';')[0]}</td>
                                    <td className="border px-4 py-2">{format.qualityLabel}</td>
                                    <td className="border px-4 py-2">
                                        <a href={format.url} target='_blank'download className="p-2 bg-green-500 text-white rounded">
                                            Download
                                        </a>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}