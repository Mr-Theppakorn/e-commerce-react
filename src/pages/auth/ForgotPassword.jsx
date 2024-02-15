import { Container, TextField, Typography, Button } from '@mui/material'
import React, { useState, useEffect, useCallback } from 'react'
import { auth } from '../../assets/firebase'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = ({ user }) => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleNavigate = useCallback(() => {
        if (user?.token) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        handleNavigate();
    }, [handleNavigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: 'http://localhost:5173/login',
            handleCodeInApp: true
        };
        await auth.sendPasswordResetEmail(email, config)
            .then((result) => {
                setEmail("");
                toast.success('Check your email for password reset');
            }).catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    }


    return (
        <Container maxWidth="md" className="mt-10">
            <Typography variant="h4" color="initial" className="text-center mb-5">Reset Password</Typography>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <TextField
                        name='email'
                        label="Email"
                        placeholder='Enter your email address'
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">Send</Button>
            </form>
        </Container>
    )
}

export default ForgotPassword;