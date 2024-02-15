import React, { useState, useEffect } from "react";
import {
    Container,
    Box,
    TextField,
    Typography,
    Button,
    Link
} from "@mui/material";
import Grid from '@mui/material/Grid';
import GoogleIcon from '@mui/icons-material/Google';
import LinearProgress from '@mui/material/LinearProgress';
import { auth, googleAuthProvider } from '../../assets/firebase'
import { useDispatch } from 'react-redux'
import { addUser } from "../../store/slices/userSlice";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser } from "../../api/auth";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const roleRedirect = (res) => {
        if (res.data.role === "admin") {
            navigate('/');
        } else {
            navigate('/');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await auth.signInWithEmailAndPassword(email, password)
                .catch(err => {
                    toast.error(err.message);
                    setLoading(false)
                });
            const { user } = result;
            const idToken = await user.getIdTokenResult();
            createUser(idToken.token)
                .then((res) => {
                    dispatch(addUser({ name: res.data.name, email: res.data.email, image: res.data.image, token: idToken.token, role: res.data.role, id: res.data._id }));
                    roleRedirect(res);
                }).catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
            toast.success('Login successful');
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const onGoogle = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                setLoading(true);
                const { user } = result;
                const idToken = await user.getIdTokenResult();
                createUser(idToken.token)
                    .then((res) => {
                        dispatch(addUser({ name: res.data.name, email: res.data.email, token: idToken.token, role: res.data.role, id: res.data._id }));
                    }).catch((err) => {
                        console.log(err);
                    });
                setLoading(false);
                navigate('/');
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });

    };

    return (
        <Container component="main" maxWidth="xs" className="mt-20 mb-80">
            <div className="w-full bg-white rounded-lg shadow dark:border p-10">
                <Typography variant="h4" color="initial" className="text-center mb-5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <div className="mb-5">
                        <TextField
                            name="email"
                            label="Email"
                            placeholder="Enter your email address"
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
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        className="text-white bg-green-500 hover:bg-green-600"
                        variant="contained"
                        fullWidth
                        type="submit"
                        disabled={!(email && password.length > 6)}
                    >
                        Login
                    </Button>
                </Box>
                <Button
                    className="bg-red-500 hover:bg-red-600 mt-5"
                    variant="contained"
                    fullWidth
                    type="submit"
                    onClick={onGoogle}
                >
                    <GoogleIcon className="mr-1" /> Login With Google
                </Button>
                <Grid container className="mt-5">
                    <Grid item xs>
                        <Link href="/login/forgot" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
                {loading && <LinearProgress className="mt-5" />}
            </div>
        </Container >
    );
};

export default Login;
