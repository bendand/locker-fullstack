import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { Textarea } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';

export default function DeleteForm({ onCancel, onProceed }) {
    return (
        <Stack>
            <div>
                <p>Are you sure you want to delete the locker?</p>
            </div>
            <Button 
                onClick={onCancel}
            >
                Cancel
            </Button>
            <Button 
                color="danger"
                onClick={onProceed}
            >
                Delete Locker
            </Button>
        </Stack>

    );
}