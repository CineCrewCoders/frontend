import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { User } from '@firebase/auth-types';
import { LockOutlined } from '@mui/icons-material';
import {
    Avatar, Box, Button, CircularProgress, Container, CssBaseline, Grid, TextField, Typography
} from '@mui/material';
import { UseMutateAsyncFunction } from '@tanstack/react-query';

import { IAuth } from '../interfaces';

interface IAuthLayoutScreen {
    onSubmit: UseMutateAsyncFunction<User, Error, IAuth, unknown>
    signIn: boolean
    isLoading?: boolean
}

export const AuthLayout: FunctionComponent<IAuthLayoutScreen> = ({ onSubmit, signIn, isLoading }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSendData = async () => {
        const credentials = { email, password }
        try {
            await onSubmit(credentials)
        } catch (error) {
            toast.error((error as Error).message, {
                position: "bottom-center",
            });
        }
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {signIn ? 'Sign in' : 'Sign up'}
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {!isLoading ?
                            <>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => onSendData()}
                                    disabled={isLoading}
                                >
                                    {signIn ? 'Sign In' : 'Sign Up'}
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        {signIn ? <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/register">{"Don't have an account? Sign Up"}</Link > : <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/login">{"Already have an account? Sign In"}</Link>}
                                    </Grid>
                                </Grid>
                            </>
                            : <CircularProgress />}
                    </Box>
                </Box>
            </Container>
        </>
    )
}
