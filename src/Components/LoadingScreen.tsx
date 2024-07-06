
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingScreen: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 9999,
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingScreen;
