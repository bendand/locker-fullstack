import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import { useState, useContext } from 'react';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';



export default function DeleteForm({ onCancel, onProceedDelete }) {
    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <ModalDialog>
            <div>
                <p>Are you sure you want to delete the locker?</p>
            </div>
            <form>
                <Stack spacing={2}>
                    {errorMessage && (
                        <p>{errorMessage}</p>
                    )}
                    <Button 
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="danger"
                        onClick={() => onProceedDelete.handleDeleteLocker()}
                    >
                        Delete Locker
                    </Button>
                </Stack>
            </form>
        </ModalDialog>

    );
}