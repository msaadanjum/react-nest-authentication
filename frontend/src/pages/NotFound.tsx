import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { ErrorOutline, HomeOutlined } from '@mui/icons-material';

export default function NotFoundPage() {


    const navigate = useNavigate()
    const handleGoHomeClick = () => {
        navigate('/');
    };


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f0f4f8"
            padding={2}
        >
            <Card variant="outlined" sx={{ maxWidth: 500, p: 3, boxShadow: 3, textAlign: 'center' }}>
                <CardContent>
                    <Box textAlign={'center'}>
                        <ErrorOutline sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
                    </Box>
                    <Typography level="h1" component="div" fontSize="2xl" sx={{ mb: 1 }}>
                        404 - Page Not Found
                    </Typography>
                    <Typography sx={{ mb: 2, fontSize: '1rem', color: 'text.secondary' }}>
                        Oops! The page you are looking for does not exist. It might have been moved or deleted.
                    </Typography>
                    <Button
                        variant="solid"
                        color="primary"
                        fullWidth
                        startDecorator={<HomeOutlined />}
                        sx={{ mt: 2 }}
                        onClick={handleGoHomeClick}
                    >
                        Go Home
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};
