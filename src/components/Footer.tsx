import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
    <Box className="page-footer">
        <img src="/Footer.png" alt="" width="100%" height="60px" />
        <Typography variant="caption" color="GrayText" sx={{ pt: 4, textAlign: 'center', display: 'block' }}>
            PT Padepokan Tujuh Sembilan
        </Typography>
    </Box>
);

export default Footer;