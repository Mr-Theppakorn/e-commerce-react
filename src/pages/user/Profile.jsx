import React, { useState } from 'react'
import { Container, TextField, Typography, Button } from '@mui/material'
import { auth } from '../../assets/firebase'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { toast } from 'react-toastify';

const Profile = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
        console.log(credential);
        user.reauthenticateWithCredential(credential)
            .then(() => {
                user.updatePassword(newPassword)
                    .then(() => {
                        toast.susses('Updated password successfully');
                        setOldPassword('');
                        setNewPassword('');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    return (
        <Container maxWidth="sm" className="mt-10 h-[82vh]"  >
            <Typography variant="h4" color="initial" className="text-center mb-5">Change Your Password</Typography>
            <div className='divider' />
            <form onSubmit={handleSubmit} >
                <div className="mb-5">
                    <TextField
                        name='oldPassword'
                        type='password'
                        label="Current Password"
                        variant="outlined"
                        fullWidth
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <TextField
                        name='newPassword'
                        label="New Password"
                        type='password'
                        variant="outlined"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form >
        </Container >
    )
}

export default Profile