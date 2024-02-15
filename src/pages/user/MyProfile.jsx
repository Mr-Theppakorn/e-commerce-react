import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeImage, updateUser } from '../../api/auth';
import Resizer from 'react-image-file-resizer'
import { updateImage } from '../../store/slices/userSlice';
import { useState } from 'react';

const MyProfile = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const { name, token, image } = useSelector(state => state.user);
    const imageResize = (e) => {

        let file = e.target.files[0];
        if (file) {
            Resizer.imageFileResizer(
                file,
                720,
                720,
                'JPEG',
                100,
                0,
                (uri) => {
                    changeImage(token, uri, image?.public_id)
                        .then((res) => {
                            dispatch(updateImage(res.data))
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                },
                'base64'
            );
        }
    };

    const handleName = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = () => {
        updateUser(token, text)
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='container mx-auto'>
            <div className='w-2/3 mx-auto border border-base-200 shadow-xl m-20 p-10 '>
                <div className='text-2xl font-bold text-center'>Your Profile</div>
                <div class="flex flex-col items-center">
                    <div className="avatar m-5">
                        <div className="w-56 rounded-full">
                            <img src={image?.url ? image.url : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} />

                        </div>
                    </div>
                    <div className=''>
                        <input
                            type="file"

                            className="file-input w-full mt-5"
                            onChange={imageResize}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs mt-5">
                        <label className="label">
                            <span className="label-text text-lg font-bold">Name</span>
                        </label>
                        <input defaultValue={name} onChange={handleName} type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs" />
                        <button className='btn btn-success mt-5' onClick={handleSubmit}>Update</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MyProfile;