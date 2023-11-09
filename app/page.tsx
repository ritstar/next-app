"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles: string | any[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  }
  });

  const convertToPDF = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

    const response = await axios.post(
      'https://talented-dog-panama-hat.cyclic.app/convert',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    setDownloadUrl(response.data.downloadUrl);
  } };

  return (
    <main className="flex flex-col items-center justify-between p-4 md:p-24">
      <h1 className="text-4xl mb-8">Convert to PDF</h1>
      <div
        {...getRootProps()}
        className="dropzone w-64 h-64 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )}
      </div>
      {file && (
        <button
          onClick={convertToPDF}
          className="mt-8 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Convert to PDF
        </button>
      )}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download
          className="mt-8 inline-block bg-green-500 text-white px-4 py-2 rounded"
        >
          Download PDF
        </a>
      )}
    </main>
  );
}