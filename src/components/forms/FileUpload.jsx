import React, { useRef } from 'react'
import Button from '@mui/material/Button'
import Resizer from 'react-image-file-resizer'
import { useSelector } from 'react-redux'
import { removeImages, uploadImages } from '../../api/product'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const FileUpload = ({ values, setValues, setLoading }) => {
    const { token } = useSelector(state => state.user);
    const fileInputRef = useRef(null);
    console.log(values);

    const fileUpload = async (e) => {
        setLoading(true);
        let files = e.target.files;
        let allUploadedFiles = [];

        if (files) {
            try {
                const uploadPromises = Array.from(files).map(async (file) => {
                    return new Promise((resolve, reject) => {
                        Resizer.imageFileResizer(file, 720, 720, 'JPEG', 100, 0, async (uri) => {
                            try {
                                const response = await uploadImages(token, uri);
                                allUploadedFiles.push(response.data);
                                resolve();
                            } catch (error) {
                                reject(error);
                            }
                        }, 'base64');
                    });
                });

                await Promise.all(uploadPromises);
                setValues({ ...values, images: allUploadedFiles });
            } catch (error) {
                console.error('Error uploading files:', error);
            } finally {
                setLoading(false);
            }
        }
    };



    const imageResizeEx = (e) => {
        let files = e.target.files;
        if (files) {
            let newImages = [];
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        newImages.push(uri);
                        if (newImages.length === files.length) {
                            setImages(newImages);
                        }
                    },
                    'base64'
                );
            }
        }
    };

    const onRemoveImage = (public_id) => {
        setLoading(true);
        removeImages(token, public_id)
            .then((res) => {
                const filteredImage = images.filter((i) => {
                    return i.public_id !== public_id;
                });
                setImages(filteredImage);
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