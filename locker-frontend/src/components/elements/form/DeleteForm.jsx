import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import ModalDialog from '@mui/joy/ModalDialog';

export default function DeleteForm({ unit, onCancel, onProceedDelete }) {
    
    // this form handles the deletion of lockers, containers, and items -
    // good opportunity for me to exercise component reusability
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