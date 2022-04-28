// import React , {useState} from 'react';
// import reactS3, {uploadFile} from 'react-s3';
// import S3FileUpload from 'react-s3';


// const S3_BUCKET ='autobarn';
// const REGION ='us-west-1';
// const ACCESS_KEY ='AKIA3CIQTOHFC2V65DWK';
// const SECRET_ACCESS_KEY ='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';

// const config = {
//     bucketName: S3_BUCKET,
//     region: REGION,
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
// }

// const UploadImage = () => {

//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileInput = (e) => {
//         setSelectedFile(e.target.files[0]);
//     }

//     const handleUpload = async (file) => {
//         uploadFile(file, config)
//             .then(data => console.log(data))
//             .catch(err => console.error(err))
//     }

//     return <div>
//         <div>React S3 File Upload</div>
//         <input type="file" onChange={handleFileInput}/>
//         <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
//     </div>
// }

// export default UploadImage;


import React ,{useState} from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET ='autobarn';
const REGION ='us-west-1';


AWS.config.update({
    accessKeyId: 'AKIA3CIQTOHFC2V65DWK',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadImage = () => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


    return <div>
        <div>Upload progress: {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImage;
