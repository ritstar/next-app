import React, {useState} from 'react';

export default function YoutubeVideoDownload() {
    const [url, setUrl] = useState('');
    const [videoData, setVideoData] = useState<any[] | null>(null);

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
      
        const response = await fetch(`process.env.CYCLIC_URL/YoutubeVideoDownload?url=${encodeURIComponent(url)}`);
        const data = await response.json();
      
        setVideoData(data);
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
                {videoData && (
                    <div>
                        {videoData.map((format, index) => (
                            <a key={index} href={format.url} download className="block p-2 bg-green-500 text-white rounded mb-2">
                                Download {format.format}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}