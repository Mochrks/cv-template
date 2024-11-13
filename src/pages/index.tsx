"use client";

import LandingPage from "@/components/Home";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{ margin: 0, padding: 0, height: '100vh', width: '100%', }}
    >
      <LandingPage />
    </Box>
  );
};