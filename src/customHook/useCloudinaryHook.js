import { useState } from 'react';
import axios from 'axios';

const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [imageUrl,setImageUrl]=useState(null)
  const [imageUploading, setImageUploading] = useState(false);
  const [imgError, setImgError] = useState(null);
  const uploadPdf = async (file) => {
    if (!file) {
      setError('No file selected');
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'k7b1z821'); 

    try {
      setUploading(true);
      const response = await axios.post('https://api.cloudinary.com/v1_1/dqnwg0cam/upload', formData); // Replace with your actual cloud name
      const pdfUrl = response.data.secure_url;
      console.log('Cloudinary response:', response.data);
      console.log('PDF URL:', pdfUrl);
      setUrl(pdfUrl);
      setError(null);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const uploadImage = async (file) => {
    if (!file) {
      setImgError('No Image selected');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setImgError('Only image files are allowed');
      return;
    }

    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'k7b1z821'); 

    try {
      setImageUploading(true);
      const response = await axios.post('https://api.cloudinary.com/v1_1/dqnwg0cam/image/upload', formData); // Replace with your actual cloud name
      const imageUrl = response.data.secure_url;
      console.log('Cloudinary response:', response.data);
      console.log('Image URL:', imageUrl);
      setImageUrl(imageUrl);
      setImgError(null);
    } catch (err) {
      console.error('Upload error:', err);
      setImgError(err.message);
    } finally {
      setImageUploading(false);
    }
  };

  return { uploading, error, url,imgError,imageUploading, imageUrl, uploadImage ,uploadPdf };
};

export default useCloudinaryUpload;
