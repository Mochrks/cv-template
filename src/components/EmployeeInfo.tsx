
import React from 'react';
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';

const EmployeeInfo = ({ employee }) => (
    <Stack direction="column" spacing={3} alignItems="stretch">
        <Stack direction="row" alignItems="center">
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ py: 1 }}>
                    <strong>{employee.name || 'No Name'}</strong>
                </Typography>
                <Divider sx={{ borderBottomWidth: 2, borderColor: '#000000', marginTop: 1 }} />
                <Typography variant="subtitle1">{employee.position || 'No Position'}</Typography>
                <Typography variant="subtitle2">{employee.email || 'No Email'}</Typography>
            </Box>
            <Box>
                <Avatar src={employee.image || ''} sx={{ height: 150, width: 150 }}>
                    {employee.image ? 'Talent Image' : 'No Image'}
                </Avatar>
            </Box>
        </Stack>
    </Stack>
);

export default EmployeeInfo;