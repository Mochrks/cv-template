import React, { useState } from 'react';
import {
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,

    IconButton,
    Tooltip,
    Zoom,
    Box,
    Typography,
    Paper,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const InfoComponent = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* Floating Action Button */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                }}
            >
                <Tooltip
                    title="Information"
                    TransitionComponent={Zoom}
                    arrow
                >
                    <Fab
                        color="primary"
                        onClick={handleClickOpen}
                        sx={{
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                            },
                            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        }}
                    >
                        <InfoIcon />
                    </Fab>
                </Tooltip>
            </Box>

            {/* Dialog/Modal */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        background: 'linear-gradient(to bottom, #ffffff 0%, #f5f5f5 100%)',
                    }
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        Printing & Export Information
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Print Section */}
                        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <PrintIcon color="primary" sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Print Document
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Press <strong>Ctrl + P</strong> to print the current document
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>

                        {/* PDF Export Section */}
                        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <PictureAsPdfIcon color="error" sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Export to PDF
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Press <strong>Ctrl + P</strong> and select Save as PDF in the printer options
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>

                        {/* Additional Info */}
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                            Note: Make sure all content is properly loaded before printing or exporting
                        </Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default InfoComponent;