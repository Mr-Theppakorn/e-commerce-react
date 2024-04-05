import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeImage, updateUser } from '../../api/auth';
import { updateImage, updateUserName } from '../../store/slices/userSlice';
import { useState } from 'react';

export const covertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}

const MyProfile = () => {
    const dispatch = useDispatch();
    const { name, token, image } = useSelector(state => state.user);
    const [text, setText] = useState(name);

    const imageResize = async (e) => {
        let file = e.target.files[0];
        const base64 = await covertBase64(file);
        changeImage(token, base64, image?.public_id)
            .then((res) => {
                dispatch(updateImage(res.data))
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleName = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = () => {
        updateUser(token, text)
            .then((res) => {
                dispatch(updateUserName(res.data.name))

            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='container mx-auto'>
            <div className='w-2/3 mx-auto border border-base-200 shadow-xl m-20 p-10 '>
                <div className='text-2xl font-bold text-center'>Your Profile</div>
                <div className="flex flex-col items-center">
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
