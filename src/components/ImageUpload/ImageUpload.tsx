import React, { useState, useRef } from 'react';
import './ImageUpload.css';
import axios from '../axios';
import { storage } from '../../firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { nanoid } from 'nanoid';

const ImageUpload = ({ username }: any) => {
  const [url, setUrl] = useState('');
  const [image, setImage] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');
  const inputImageRef = useRef<any>();

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = (e: any) => {
    const storageRef = ref(storage, `images/${image.name + nanoid()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot: any) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
          setUrl(url);
          axios.post('/upload', {
            caption: caption,
            username: username,
            imageUrl: url,
          });
          setProgress(0);
          setCaption('');
          setImage(null);
          if (inputImageRef) {
            inputImageRef.current.value = '';
          }
        });
      }
    );
  };

  return (
    <div className='imageUpload'>
      <progress className='imageUpload__progress' value={progress} max='100' />
      <input
        type='text'
        placeholder='Enter a caption...'
        className='imageUpload__input'
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        className='imageUpload__file'
        type='file'
        onChange={handleChange}
        ref={inputImageRef}
      />
      <button className='imageUpload__button' onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};
export default ImageUpload;
