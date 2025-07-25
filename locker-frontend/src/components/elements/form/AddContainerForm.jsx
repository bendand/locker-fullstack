import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';


export default function AddContainerForm() {
    return (
        <ModalDialog>
            <DialogTitle>Create new project</DialogTitle>
            <DialogContent>Fill in the information of the project.</DialogContent>
            <form
                onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
                }}
            >
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input autoFocus required />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input required />
                    </FormControl>
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
        </ModalDialog>
    );
}