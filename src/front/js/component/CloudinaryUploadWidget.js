import React, { useEffect, useRef } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';

export const CLOUDINARY_CLOUD_NAME = 'hzxyensd5';
export const CLOUDINARY_UPLOAD_PRESET = 'aoh4fpwm';


const CloudinaryUploadWidget = ({ folder, setImageURL }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);
  new Cloudinary({ cloud: { cloudName: CLOUDINARY_CLOUD_NAME }, });

  const uwConfig = {
    cloudName: CLOUDINARY_CLOUD_NAME,
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
    folder,
    theme: 'green',
};

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === 'success') {
              const { url } = result.info
              setImageURL(url);
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener('click', handleUploadClick);

        // Cleanup
        return () => {
          buttonElement.removeEventListener('click', handleUploadClick);
        };
      }
    };

    initializeUploadWidget();
  }, [uwConfig, setImageURL]);

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="cloudinary-button"
    >
      Upload
    </button>
  );
};

export default CloudinaryUploadWidget;
