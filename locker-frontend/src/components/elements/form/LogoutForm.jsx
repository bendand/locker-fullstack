import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import ModalDialog from '@mui/joy/ModalDialog';

export default function LogoutForm({ onCancel, onLogout }) {

    return (
        <ModalDialog>
            <div>
                <p>Are you sure you want to log out?</p>
            </div>
            <form>
                <Stack 
                    spacing={2}
                    direction="row"
                >
                    <Button 
                        onClick={onCancel}
                        variant='plain'
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={onLogout}
                    >
                        Log me out
                    </Button>
                </Stack>
            </form>
        </ModalDialog>

    );
}