import React from 'react';
import {
    Box,
    Tooltip,
    Fab,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const InfoComponent = () => {

    const handlePrintDocument = () => {
        window.print();
    };

    // const handleExportToPDF = () => {
    //     window.print();
    // };

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                }}
                className="no-print"
            >
                <Tooltip
                    title="Print"
                    arrow
                >
                    <Fab
                        color="primary"
                        onClick={handlePrintDocument}
                    >
                        <PrintIcon />
                    </Fab>
                </Tooltip>

                {/* <Tooltip
                    title="Export to PDF"
                    arrow
                >
                    <Fab
                        color="secondary"
                        onClick={handleExportToPDF}
                    >
                        <PictureAsPdfIcon />
                    </Fab>
                </Tooltip> */}
            </Box>

            {/* CSS untuk pengaturan cetak */}
            <style>
                {`
                    @media print {
                        @page {
                            size: A5;
                        }
                        
                    }
                `}
            </style>
        </>
    );
};

export default InfoComponent;