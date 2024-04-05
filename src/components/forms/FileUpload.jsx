import React, { useRef } from 'react'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { removeImages, uploadImages } from '../../api/product'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { covertBase64 } from '../../pages/user/MyProfile'

const FileUpload = ({ values, setValues, setLoading }) => {
    const { token } = useSelector(state => state.user);
    const fileInputRef = useRef(null);
    console.log(values, 'values');

    const fileUpload = async (e) => {
        setLoading(true);
        let files = e.target.files;
        let allUploadedFiles = [];
        if (files) {
            try {
                const uploadPromises = Array.from(files).map(async (file) => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            const base64 = await covertBase64(file);
                            const response = await uploadImages(token, base64);
                            allUploadedFiles.push(response.data);
                            resolve();
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
                await Promise.all(uploadPromises);
                setValues({ ...values, images: [...values.images, ...allUploadedFiles] });
            } catch (error) {
                console.error('Error uploading files:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const onRemoveImage = (public_id) => {
        setLoading(true);
        removeImages(token, public_id, values._id)
            .then((res) => {
                console.log(res.data, 'res.data');
                const filteredImage = values.images.filter((i) => {
                    return i.public_id !== public_id;
                });
                setValues({ ...values, images: filteredImage });
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <div className='mt-5'>
            {values.images?.length > 0 && <Stack spacing={3} direction="row" className='m-4'>
                {values.images?.map((image) => (
                    <Badge key={image.public_id} color="secondary" badgeContent="X" onClick={() => onRemoveImage(image.public_id)}>
                        <Avatar variant='square' src={image.url} sx={{ width: 50, height: 50 }} />
                    </Badge>
                ))}
            </Stack>}
            <Button
                variant="contained"
                component="label"
            >
                Upload File
                <input
                    type="file"
                    multiple
                    accept='images/*'
                    hidden
                    onChange={fileUpload}
                    ref={fileInputRef}
                />
            </Button>
        </div>

    )
}

export default FileUpload;
