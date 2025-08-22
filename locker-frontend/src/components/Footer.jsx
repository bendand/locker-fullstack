import Box from '@mui/joy/Box';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                p: 2,
                mt: 'auto',
                borderTop: '1px solid',
                backgroundColor: 'background.body',
            }}
        >
            <small>copyright 2025</small>
        </Box>
    );
}