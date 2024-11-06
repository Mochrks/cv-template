import React from 'react';
import { Box } from '@mui/material';

const Header = () => (
    <Box className="page-header">
        <img src="/Header.png" alt="" width="100%" height="50px" />
        <Box component="img" src="/Logo.svg" alt="" sx={{ height: 45, position: 'absolute', top: 58, left: 70 }} />
    </Box>
);

export default Header;