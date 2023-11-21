"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Image from 'next/image';
import docLogo from '../public/image_icon.png';
import docxLogo from '../public/image_icon.png';
import { Select, SelectItem } from '@nextui-org/react'; // import Select from your UI library
require('dotenv').config();

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('jpeg'); // new state variable for selected format
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: string | any[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/png': ['.png'],
      'image/bmp': ['.bmp'],
      'image/tiff': ['.tiff'],
      'image/gif': ['.gif']
    }
  });

  const convertImage = async () => {
    if (file) {
      const fileType = file.type.split('/')[1];
      if (fileType.toLowerCase() === selectedFormat.toLowerCase()) {
        setShowPopup(true);
        return;
      }
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', selectedFormat);

      try {
        const response = await axios.post(
          `${process.env.CYCLIC_URL}/convert`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        setDownloadUrl(response.data.downloadUrl);
        setIsLoading(false);
      } catch (err) {
        if(err instanceof Error){
        setError(err.message); 
        }
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-4 md:p-24">
      <h1 className="text-4xl mb-8">Convert Image Format</h1>
      <div className="flex">
        <div
          {...getRootProps()}
          className="dropzone w-64 h-64 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500"
        >
          <input {...getInputProps()} />
          {file ? (
            <div>
              <Image src={file.name.endsWith('.doc') ? docLogo : docxLogo} alt="filetype logo" width={50} height={50} />
              <p>{file.name}</p>
            </div>
          ) : isDragActive ? (
            <p className="text-center text-blue-500 font-bold">Drop the files here ...</p>
          ) : (
            <p className="text-center text-blue-500 font-bold">Drag & drop some files here, or click to select files</p>
          )}
        </div>
        <div className="flex items-center justify-center w-full flex-wrap gap-4 left-4">
          <Select
            key="primary"
            color="primary"
            className="ml-4 border border-gray-300 rounded-md "
            placeholder="Select format"
            onChange={(e) => setSelectedFormat(e.target.value)}
          >
            <SelectItem key="jpeg" value="jpeg">JPEG</SelectItem>
            <SelectItem key="png" value="png">PNG</SelectItem>
            <SelectItem key="bpm" value="bmp">BMP</SelectItem>
            <SelectItem key="tiff" value="tiff">TIFF</SelectItem>
            <SelectItem key="gif" value="gif">GIF</SelectItem>
          </Select>
        </div>
      </div>
      {isLoading && <p>Converting file...</p>}
      {file && !isLoading && (
        <button
          onClick={convertImage}
          className="mt-8 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Convert Image
        </button>
      )}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download
          className="mt-8 inline-block bg-green-500 text-white px-4 py-2 rounded"
        >
          Download Image
        </a>
      )}
      {showPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Error
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        The uploaded file type cannot be the same as the selected format.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowPopup(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Error
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => {setError(null); setIsLoading(false)}}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}