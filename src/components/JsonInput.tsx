
import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const JsonInput = ({ jsonTemplate, jsonInput, setJsonInput, handleJsonSubmit }) => (
    <Box sx={{ p: 2, width: '100%' }} className="no-print">
        <Typography variant="h6">Paste JSON Data</Typography>
        <Box
            sx={{
                p: 2,
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                mb: 2,
                fontFamily: 'monospace',
                whiteSpace: 'pre-line',
            }}
        >
            {jsonTemplate}
        </Box>
        <TextField
            label="Input JSON"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
        />
        <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={handleJsonSubmit}>
            Submit
        </Button>
    </Box>
);

export default JsonInput;