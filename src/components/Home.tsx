import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Paper,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Link from 'next/link';

// Styled Components
const RootContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
}));

const OptionPaper = styled(Paper)(({ theme }) => ({
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[12],
    },
}));

const LandingPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);

    };

    return (
        <RootContainer>
            <Container sx={{ width: '100%', height: '100%', padding: 0 }}>
                <Grid
                    container
                    spacing={4}
                    direction={isMobile ? 'column' : 'row'}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '100%' }}
                >
                    <Grid item xs={12} md={5}>
                        <OptionPaper
                            elevation={8}
                            onClick={() => handleOptionSelect('p79')}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedOption === 'p79'
                                    ? theme.palette.primary.main
                                    : 'white'
                            }}
                        >
                            <DocumentScannerIcon
                                sx={{
                                    fontSize: 100,
                                    color: selectedOption === 'p79'
                                        ? 'white'
                                        : theme.palette.primary.main,
                                    mb: 2
                                }}
                            />
                            <Typography
                                variant="h4"
                                gutterBottom
                                align="center"
                                sx={{
                                    fontWeight: 'bold',
                                    color: selectedOption === 'p79' ? 'white' : 'inherit'
                                }}
                            >
                                P79 CV Generator
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                align="center"
                                sx={{
                                    color: selectedOption === 'p79'
                                        ? 'rgba(255,255,255,0.7)'
                                        : 'textSecondary'
                                }}
                            >
                                P79 Template
                            </Typography>
                            <Link href="/p79-template" style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        mt: 3,
                                        '&:hover': {
                                            backgroundColor: selectedOption === 'p79' ? 'white' : theme.palette.primary.main,
                                        },
                                        backgroundColor: selectedOption === 'p79'
                                            ? 'white'
                                            : undefined,
                                        color: selectedOption === 'p79'
                                            ? theme.palette.primary.main
                                            : undefined
                                    }}
                                >
                                    Select Template
                                </Button>
                            </Link>
                        </OptionPaper>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <OptionPaper
                            elevation={8}
                            onClick={() => handleOptionSelect('ats')}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: selectedOption === 'ats'
                                    ? theme.palette.secondary.main
                                    : 'white'
                            }}
                        >
                            <AutoFixHighIcon
                                sx={{
                                    fontSize: 100,
                                    color: selectedOption === 'ats'
                                        ? 'white'
                                        : theme.palette.secondary.main,
                                    mb: 2
                                }}
                            />
                            <Typography
                                variant="h4"
                                gutterBottom
                                align="center"
                                sx={{
                                    fontWeight: 'bold',
                                    color: selectedOption === 'ats' ? 'white' : 'inherit'
                                }}
                            >
                                ATS CV Generator
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                align="center"
                                sx={{
                                    color: selectedOption === 'ats'
                                        ? 'rgba(255,255,255,0.7)'
                                        : 'textSecondary'
                                }}
                            >
                                ATS Template
                            </Typography>
                            <Link href="/ats-template" style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                        mt: 3,
                                        '&:hover': {
                                            backgroundColor: selectedOption === 'ats' ? 'white' : '',
                                        },
                                        backgroundColor: selectedOption === 'ats'
                                            ? 'white'
                                            : undefined,
                                        color: selectedOption === 'ats'
                                            ? theme.palette.secondary.main
                                            : undefined
                                    }}
                                >
                                    Select Template
                                </Button>
                            </Link>
                        </OptionPaper>
                    </Grid>
                </Grid>
            </Container>
        </RootContainer>
    );
};

export default LandingPage;