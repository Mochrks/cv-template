import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const Footer = () => (
    <Box className="page-footer">
        <Image src="/Footer.png" alt="" width={1000} height={60} layout="responsive" />
        <Typography variant="caption" color="GrayText" sx={{ pt: 4, textAlign: 'center', display: 'block' }}>
            PT Padepokan Tujuh Sembilan
        </Typography>
    </Box>
);

export default Footer;