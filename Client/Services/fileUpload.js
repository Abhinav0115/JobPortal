export const UploadFile = async(file,preset) => {
    const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', preset);
        data.append('cloud_name', `${process.env.NEXT_PUBLIC_API_CLOUD_NAME}`);
  
       const response = await fetch(`${process.env.NEXT_PUBLIC_API_CLOUDINARY_URL}`, {
          method: 'post',
          body: data,
        })
         const fileData = await response.json()
  return fileData.secure_url;
}