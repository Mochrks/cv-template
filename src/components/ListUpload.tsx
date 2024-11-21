import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemText,
    Box,
    Tooltip,
    Typography,
    Divider,
    Snackbar,
    Alert,
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';


interface File {
    id: string;
    filename: string;
    // Add other properties as needed
}
const ListUpload = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | null }>({
        open: false,
        message: '',
        severity: null,
    });

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get('/api/list-upload');
                setFiles(response.data.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchFiles();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleNotification = (message: string, severity: 'success' | 'error') => {
        setNotification({ open: true, message, severity });
    };

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const handleDeleteFile = async (fileId: string) => {
        try {
            await axios.delete(`/api/list-upload?fileId=${fileId}`);
            setFiles(files.filter(file => file.id !== fileId));
            handleNotification('File deleted successfully!', 'success');
        } catch (error) {
            console.error('Failed to delete file:', error);
            setError('Failed to delete file');
            handleNotification('Failed to delete file', 'error');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Calculate the current items to display
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFiles = files.slice(startIndex, endIndex);
    const totalPages = Math.ceil(files.length / itemsPerPage);

    // Function to render pagination
    const renderPagination = () => {
        const paginationItems = [];
        const maxVisiblePages = 5; // Maximum number of visible page numbers
        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - (maxVisiblePages - 1));
        }

        // Add previous button
        if (page > 1) {
            paginationItems.push(
                <Button
                    key="prev"
                    onClick={() => handleChangePage(page - 1)}
                    disabled={page === 1}
                    variant="outlined"
                    sx={{
                        borderRadius: '50%',
                        minWidth: '36px',
                        height: '36px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    &lt;
                </Button>
            );
        }

        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(
                <Button
                    key={i}
                    onClick={() => handleChangePage(i)}
                    variant={i === page ? 'contained' : 'outlined'}
                    color="primary"
                    sx={{
                        borderRadius: '50%',
                        minWidth: '36px',
                        height: '36px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 4px',
                    }}
                >
                    {i}
                </Button>
            );
        }

        // Add ellipsis if necessary
        if (endPage < totalPages) {
            paginationItems.push(<Typography key="ellipsis">...</Typography>);
            paginationItems.push(
                <Button
                    key={totalPages}
                    onClick={() => handleChangePage(totalPages)}
                    variant="outlined"
                    sx={{
                        borderRadius: '50%',
                        minWidth: '36px',
                        height: '36px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {totalPages}
                </Button>
            );
        }

        // Add next button
        if (page < totalPages) {
            paginationItems.push(
                <Button
                    key="next"
                    onClick={() => handleChangePage(page + 1)}
                    disabled={page === totalPages}
                    variant="outlined"
                    sx={{
                        borderRadius: '50%',
                        minWidth: '36px',
                        height: '36px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    &gt;
                </Button>
            );
        }

        return paginationItems;
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 90,
                right: 20,
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
            }}
            className="no-print"
        >
            {/* Floating Action Button */}
            <Tooltip title="Show List Uploads" arrow>
                <Fab color="primary" onClick={handleClickOpen}>
                    <FormatListBulletedIcon />
                </Fab>
            </Tooltip>

            {/* Dialog uploaded files */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white' }}>
                    <Typography variant="h6">Uploaded Files</Typography>
                </DialogTitle>
                <DialogContent sx={{ bgcolor: '#f5f5f5' }}>
                    <Divider />
                    <List>
                        {currentFiles.length === 0 ? (
                            <ListItem>
                                <ListItemText
                                    primary="The list is empty"
                                    sx={{ textAlign: 'center', width: '100%' }}
                                />
                            </ListItem>
                        ) : (
                            currentFiles.map((file, index) => (
                                <ListItem key={file.id} sx={{ borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
                                    <ListItemText
                                        primary={`${startIndex + index + 1}. ${file.filename}`}
                                        secondary={`ID: ${file.id}`}
                                    />
                                    <Button
                                        onClick={() => handleDeleteFile(file.id)}
                                        color="error"

                                    >
                                        <DeleteIcon />
                                    </Button>
                                </ListItem>
                            ))
                        )}
                    </List>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        {renderPagination()}
                    </Box>
                    <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
                        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
                            {notification.message}
                        </Alert>
                    </Snackbar>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default ListUpload;