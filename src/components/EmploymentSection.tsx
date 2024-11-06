
import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';

interface Employment {
    employer: string;
    position: string;
    from: string;
    to?: string; // optional
}

const EmploymentSection = ({ employment }: { employment: Employment[] }) => {
    <Stack direction="column" spacing={1} sx={{ flexBasis: '50%' }}>
        <Typography variant="body1" sx={{ pt: 1 }}>
            <strong>Employment</strong>
        </Typography>
        <Divider sx={{ borderBottomWidth: 2, borderColor: '#000000', marginTop: 1 }} />
        <Stack direction="column" spacing={1}>
            {employment.map((job, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {job.employer}
                        </Typography>
                        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                            {job.position}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
                        <Typography variant="body2">
                            {job.from} - {job.to ? job.to : 'Present'}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Stack>
    </Stack>
}


export default EmploymentSection;