import { useState } from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';

export default function SnackbarWithDecorators({ message }) {
    const [open, setOpen] = useState(true);

    return (
        <div>
            <Snackbar
                variant="soft"
                color="success"
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                endDecorator={
                    <Button
                        onClick={() => setOpen(false)}
                        size="sm"
                        variant="soft"
                        color="success"
                    >
                        Dismiss
                    </Button>
                }
            >
                {message}
            </Snackbar>
        </div>
    );
}