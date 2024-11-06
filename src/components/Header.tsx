import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

const Header = () => (
    <Box className="page-header" sx={{ position: 'relative' }}>
        <Image
            src="/Header.png"
            alt=""
            layout="responsive"
            width={1000}
            height={50}
        />
        <Box sx={{ position: 'absolute', top: 58, left: 70, width: 45, height: 45 }}>
            <Image
                src="/Logo.svg"
                alt=""
                layout="fill"
                objectFit="contain"
            />
        </Box>
    </Box>
);

export default Header;