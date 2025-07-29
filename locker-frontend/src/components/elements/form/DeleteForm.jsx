import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import { useState, useContext } from 'react';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';



export default function DeleteForm({ unit, onCancel, onProceedDelete }) {

    return (
        <ModalDialog>
            <div>
                <p>Are you sure you want to delete the {unit}?</p>
            </div>
            <form>
                <Stack spacing={2}>
                    <Button 
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="danger"
                        onClick={onProceedDelete}
                    >
                        Delete {unit}
                    </Button>
                </Stack>
            </form>
        </ModalDialog>

    );
}