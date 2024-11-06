
import React from 'react';
import { Box, Divider, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

const ObjectiveDetail = ({ biodata }) => (
    <Stack direction="column" spacing={1} sx={{ flexBasis: '57%' }}>
        <Typography variant="body1" sx={{ pt: 1 }}>
            <strong>Objective</strong>
        </Typography>
        <Divider sx={{ borderBottomWidth: 2, borderColor: '#000000', marginTop: 1 }} />
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {biodata?.profile || 'No profile available.'}
        </Typography>

        <Typography variant="body2" sx={{ pt: 2 }}>
            <strong>Keahlian saya:</strong> {biodata?.objective || 'No skills listed.'}
        </Typography>

        <Typography variant="body1" sx={{ pt: 1 }}>
            <strong>Personal Detail</strong>
        </Typography>
        <Divider sx={{ borderBottomWidth: 2, borderColor: '#000000', marginTop: 0 }} />
        <Table size="small">
            <TableBody>
                <TableRow>
                    <TableCell sx={{ p: 0, border: 0 }}>
                        <Typography variant="body2">
                            <strong>Place of Birth:</strong> {biodata?.placeOfBirth || 'N/A'}
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ p: 0, border: 0 }}>
                        <Typography variant="body2">
                            <strong>Gender:</strong> {biodata?.gender || 'N/A'}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ p: 0, border: 0 }}>
                        <Typography variant="body2">
                            <strong>Date of Birth:</strong> {biodata?.dateOfBirth || 'N/A'}
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Stack>
);

export default ObjectiveDetail;