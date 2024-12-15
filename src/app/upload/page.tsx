    "use client";
   

    import React, { useState } from "react";

    const UploadPage: React.FC = () => {
    const [status, setStatus] = useState<string>("");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID}/sendVideo`;
    const TELEGRAM_USER_ID =  process.env.NEXT_PUBLIC_TELEGRAM_USER_ID;
    

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
        setVideoFile(file);
        }
    };
    function extractVideoFileId(response) {
       
        if (response && response.ok && response.result && response.result.video) {
      
          return response.result.video.file_id;
        } else {
         
          console.error("Invalid response structure or file_id not found.");
          return null;
        }
      }
      
    
      const getFileUrl = async (fileId) => {
    
        const url = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID}/getFile?file_id=${fileId}`;
        
        try {
          const response = await fetch(url);
          const data = await response.json();
      
          if (data.ok) {
            const filePath = data.result.file_path;
            
         
            const fileUrl = `https://api.telegram.org/file/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID}/${filePath}`;
            console.log('File URL:', fileUrl);
            return fileUrl;
          } else {
            console.error('Error:', data.description);
            return null;
          }
        } catch (error) {
          console.error('Error fetching file:', error);
          return null;
        }
      };
      
     

    // Handle video upload
    const handleUpload = async () => {
        if (!videoFile) {
        setStatus('No video file selected.');
        return;
        }

        const formData = new FormData();
        formData.append('chat_id', TELEGRAM_USER_ID); // Add Telegram chat ID here
        formData.append('video', videoFile);


        try {
    
        const response = await fetch(TELEGRAM_API_URL, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        
        console.log(await getFileUrl(extractVideoFileId(result)))

        if (response.ok && result.ok) {
            setStatus('Video uploaded successfully to Telegram!');
        } else {
            setStatus(result.description || 'Error uploading video.');
        }
        } catch (error) {
        setStatus('Error uploading video.');
        console.error('Upload error:', error);
        }
    };


   
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (videoFile) {
            handleUpload();
        } else {
        setStatus("Please select a video file first.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
        <h1>Upload Video</h1>
        <form onSubmit={handleSubmit}>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button type="submit" disabled={!videoFile}>
            Upload Video
            </button>
        </form>
        {status && <p>{status}</p>}
        </div>
    );
    };

    export default UploadPage;
