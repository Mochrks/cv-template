"use client";

import LandingPage from "@/components/Home";
import { Box, Typography, Container, Link } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        margin: 0,
        padding: 0
      }}
    >
      <Box sx={{ flex: 1 }}>
        <LandingPage />
      </Box>
      <Box
        component="footer"
        sx={{
          width: '100%',
          backgroundColor: 'background.default',
          py: 2,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} All rights reserved by{' '}
            <Link
              href="https://github.com/Mochrks"
              color="primary"
              underline="hover"
            >
              @mochrks
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}