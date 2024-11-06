"use client";
import React, { useRef, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Container,
    CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useTheme } from '@mui/material';

interface FileItem {
    name: string;
    content: string;
    size: number;
}

// Styled components
const DropZone = styled(Paper)(({ theme, dragActive }: { theme: any, dragActive: boolean }) => ({
    border: `2px dashed ${dragActive ? theme.palette.primary.main : theme.palette.grey[300]}`,
    padding: theme.spacing(4),
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent'
}));

// const JsonOutput = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(2),
//     backgroundColor: theme.palette.grey[100],
//     overflowX: 'auto',
//     '& pre': {
//         margin: 0,
//         fontFamily: 'monospace'
//     }
// }));

interface UploadFileProps {
    onDataReceived: (data: any) => void;
}

export default function UploadFile({ onDataReceived }: UploadFileProps) {
    const theme = useTheme();
    const [files, setFiles] = useState<FileItem | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [output, setOutput] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles?.[0]) {
            await processFile(droppedFiles[0]);
        }
    };

    const handleFileUpload = async (fileList: FileList | null) => {
        if (fileList?.[0]) {
            await processFile(fileList[0]);
        }
    };

    const processFile = async (file: File) => {
        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setFiles({
                name: file.name,
                content: e.target?.result as string,
                size: file.size
            });
        };
        reader.readAsDataURL(file);
    };



    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const extractToJson = async () => {
        if (!files) {
            console.error('No file to upload');
            return;
        }

        setIsLoading(true);
        try {

            console.log('Sending PDF for processing...');
            const processResponse = await fetch('/api/process-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileContent: files.content
                }),
            });

            if (!processResponse.ok) {
                throw new Error(`Failed to process PDF: ${processResponse.statusText}`);
            }

            const { text } = await processResponse.json();
            console.log(text);
            console.log('PDF processed successfully');

            console.log('Generating JSON...');
            const jsonResponse = await fetch('/api/generate-json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!jsonResponse.ok) {
                throw new Error(`Failed to generate JSON: ${jsonResponse.statusText}`);
            }

            const result = await jsonResponse.json();
            // setOutput(JSON.stringify(result, null, 2));
            onDataReceived(result);
            console.log(result);
            console.log('JSON generated successfully');
        } catch (error) {
            console.error('Error:', error);
            // setOutput(`Error processing file: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 5 }}>
                <Typography variant="h3" component="h1" align="center" gutterBottom>
                    Upload File
                </Typography>

                <DropZone
                    theme={theme}
                    dragActive={dragActive}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    elevation={0}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        style={{ display: 'none' }}
                    />
                    <Typography>
                        Drag and drop your PDF file here or click to select file
                    </Typography>

                    {files && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Uploaded File:
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                <InsertDriveFileIcon fontSize="small" />
                                <Typography variant="body2">
                                    {files.name} ({formatFileSize(files.size)})
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </DropZone>

                <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Button
                        variant="contained"
                        onClick={extractToJson}
                        disabled={isLoading || !files}
                        startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
                    >
                        {isLoading ? 'Processing...' : 'Generate '}
                    </Button>
                </Box>

                {/* {output && (
                    <JsonOutput elevation={1}>
                        <pre>{output}</pre>
                    </JsonOutput>
                )} */}
            </Box>
        </Container>
    );
}


