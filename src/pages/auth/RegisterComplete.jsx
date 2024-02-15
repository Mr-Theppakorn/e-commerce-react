import { Container, TextField, Typography, Button, Snackbar, Alert } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { auth } from '../../assets/firebase'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/auth';
import { addUser } from '../../store/slices/userSlice';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showSnackbar, setShowSnackbar] = useState(false);

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            if (result.user.emailVerified) {
                window.localStorage.removeItem("emailForRegistration");
                let user = auth.currentUser;
                await user.updatePassword(password);
                const userIdToken = await user.getIdTokenResult();
                console.log('here');
                createUser(userIdToken.token)
                    .then((res) => {
                        dispatch(addUser({ name: res.data.name, email: res.data.email, token: idToken.token, role: res.data.role, id: res.data._id }));
                        setLoading(false);
                        console.log('work');
                        navigate('/');
                    }).catch((err) => {
                        console.log(err);
                        setLoading(false);
                    });
            }
        } catch (error) {
            console.error(error);

        } finally {
            setShowSnackbar(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSnackbar(false);
    };

    return (
        <Container maxWidth="md" className="mt-10 h-screen">
            <div className='p-10 m-20 border w-full h-1/2 mx-auto rounded-md shadow-md'>
                <Typography variant="h4" color="initial" className="text-center mb-5">Register</Typography>
                <div className='divider mb-10' />
                <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
                    <div className="mb-5">
                        <TextField
                            name='email'
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button variant="contained" color="primary" type="submit" disabled={loading}>Register</Button>
                </form>
            </div>
            <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Register