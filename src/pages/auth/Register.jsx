import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Typography, Button } from '@mui/material'
import { auth } from '../../assets/firebase'
import { createUser } from '../../api/auth';
import { addUser } from '../../store/slices/userSlice';

const Register = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return;
        }
        setLoading(true);
        try {
            /*const config = {
                url: 'http://localhost:5173/register/complete',
                handleCodeInApp: true
            };*/
            await auth.createUserWithEmailAndPassword(email, password);
            //window.localStorage.setItem('emailForRegistration', email);
            let user = auth.currentUser;
            const userIdToken = await user.getIdTokenResult();
            createUser(userIdToken.token)
                .then((res) => {
                    dispatch(addUser({ email: res.data.email, token: userIdToken.token, role: res.data.role, id: res.data._id }));
                    navigate('/');
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }


    return (
        <Container maxWidth="md" className="h-screen mt-20">
            <div className='p-10 border w-full h-1/2'>
                <Typography variant="h4" color="initial" className="text-center mb-5">Register</Typography>
                <div className='divider mb-10' />
                <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
                    <div className="mb-5">
                        <TextField
                            name='email'
                            label="Email"
                            variant="outlined"
                            type='email'
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
                    <div className="mb-4">
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button variant="contained" className='p-2 w-1/2 mx-auto font-semibold' color="primary" type="submit" disabled={loading}>Register</Button>
                </form>
            </div>
        </Container>
    )
}

export default Register;