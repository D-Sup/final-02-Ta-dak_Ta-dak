import imageCompression from 'browser-image-compression';

import { useState, useEffect } from 'react';

import { postImgFile } from '../api/uploadAPI';

const useImageUploader = () => {
  const [imageURL, setImageURL] = useState<string | boolean>(false);
  const [imagePath, setImagePath] = useState<string | boolean>(false);
  const [uploadValidity, setUploadValidity] = useState<string | boolean>(true);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const allowedExtensions = ['jpg', 'gif', 'png', 'jpeg', 'bmp', 'tif', 'heic'];
      const selectedExtension = selectedFile ? selectedFile.name.split('.').pop()?.toLowerCase() : '';

      const options = {
        maxSizeMB: 1,
        useWebWorker: true,
      }

      if (selectedExtension && allowedExtensions.includes(selectedExtension)) {
        imageCompression(selectedFile, options)
          .then((compressedFile) => {
            setImageURL(URL.createObjectURL(compressedFile));

            const reader = new FileReader();
            reader.onload = async function (event) {
              if (event.target?.result) {
                const compressedBlob = new Blob([event.target.result], {
                  type: compressedFile.type,
                });

                const originalFile = new File(
                  [compressedBlob],
                  compressedFile.name,
                  compressedFile
                );

                setImagePath(await postImgFile(originalFile));
              }
            };

            reader.readAsArrayBuffer(compressedFile);
          })
          .catch((error) => console.error(error));
      } else {
        setUploadValidity(false);
      }
    }
  };

  useEffect(() => {
    !uploadValidity && setUploadValidity('유효하지 않은 파일')
  }, [uploadValidity])

  return { handleImageChange, imageURL, imagePath, uploadValidity };
};

export default useImageUploader;
