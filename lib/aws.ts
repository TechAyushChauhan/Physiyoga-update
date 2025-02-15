// import AWS from 'aws-sdk';
// import fs from 'fs';
// import path from 'path';

// // Set up AWS S3 client
// const s3 = new AWS.S3();

// // Define the file to upload
// const filePath = path.join(__dirname, 'myfile.txt');
// // const bucketName = 'curetribevideo';
// // const keyName = '6GitgH1vV5vHuVsJk/0MWZfrSfDGbTGYI2GOPWX9';

// // Function to upload the file
// const uploadFile = async (file) => {
//   try {
   
//     const obj ={
//         Bucket:'curetribevideo',
//         key :file.originalname,
//         body:file.buffer

//     }
//     // Read the file
//     // const fileContent = fs.readFileSync(filePath);

//     // Upload the file to S3
 

//     const data = await s3.upload(obj).promise();
//     console.log(`File uploaded successfully: ${data.Location}`);
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// };


