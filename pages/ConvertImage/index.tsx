"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Image from 'next/image';
import docLogo from '../../public/image_icon.png';
import docxLogo from '../../public/image_icon.png';
import { Select, SelectItem } from '@nextui-org/react'; // import Select from your UI library
require('dotenv').config();
import '../../app/globals.css';
import ErrorModal from '../ErrorModal';

export default function ConvertImage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('jpeg'); // new state variable for selected format
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
        setError('Uploaded image file-type and selected file-type can not be same.');
        return;
      }
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(
          `${process.env.CYCLIC_URL}/convert?format=${selectedFormat.toLowerCase()}`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        setDownloadUrl(response.data.url);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
  };

  function shortenFilename(filename: string) {
    const name = filename.split('.')[0];
    const extension = filename.split('.')[1];

    if (name.length > 10) {
      return name.slice(0, 4) + '...' + name.slice(-4) + '.' + extension;
    }
    return filename;
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-between p-4 md:p-24">
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
                <p>{shortenFilename(file.name)}</p>
              </div>
            ) : isDragActive ? (
              <p className="text-center text-blue-500 font-bold">Drop the files here ...</p>
            ) : (
              <p className="text-center text-blue-500 font-bold">Drag & drop image here, or click to select file</p>
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
        <ErrorModal error={error} onClose={() => {setError(null); setIsLoading(false)}} />
        
      </div>
    </main>
  );
}