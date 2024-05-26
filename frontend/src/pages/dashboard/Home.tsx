import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/joy';
import useAuthStore from '../../stores/auth';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../../essentials/Api';
import toast from 'react-hot-toast';

export default function Home() {

    const { logout } = useAuthStore();

    const navigate = useNavigate()
    const handleLogout = () => {
        logout();
        navigate('/')
    }

    useEffect(() => {
        ApiRequest({
            url: "current-user",
        }).then(res => {
            toast.success("Login successful")
        })
    }, [])

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f0f4f8"
        >
            <Card variant="outlined" sx={{ maxWidth: 400, p: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography level="h1" component="div" fontSize="xl" sx={{ mb: 1 }}>
                        Welcome!
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        I'm glad to have you here and hope you like my effort.
                    </Typography>
                    <Button
                        variant="solid"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </Box>

    )
}