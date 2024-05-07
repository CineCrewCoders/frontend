import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Container maxWidth="md">
                <Typography variant="h1" fontSize={136}>
                    404
                </Typography>
                <Typography variant="h6" fontSize={32}>
                    The page you’re looking for doesn’t exist.
                </Typography>
                <Button variant="text" sx={{ marginTop: '1rem' }} onClick={() => navigate('/')}>
                    <ArrowBack fontSize="medium" />
                    <Typography variant="h6" fontSize={24}>
                        Back Home
                    </Typography>
                </Button>
            </Container>
        </Box >
    );
}
