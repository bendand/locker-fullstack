import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { Textarea } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';


export default function AddLockerForm({ onSubmission }) {
    const [inputValues, setInputValues] = useState({
        name: '',
        address: '',
        details: ''
    });

    // function that sets new values when inputs are changed
    function handleInputChange(event) {
        const { name, value } = event.target;
        
        setInputValues(prevData => ({
            ...prevData,
            [name]: value
        }));
    }


    return (
        <ModalDialog>
            <DialogTitle>Add a locker</DialogTitle>
            <form
                onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
                }}
            >
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input 
                            autoFocus 
                            required 
                            name='name'
                            value={inputValues.name}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input 
                            required
                            name='address'
                            value={inputValues.address}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Details (optional)</FormLabel>
                        <Textarea
                            placeholder="Details about location, access codes, special instructions, etc..."
                            maxLength={255}
                            minRows={2}
                            maxRows={4}
                            name='details'
                            value={inputValues.details}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <Button 
                        type="submit"
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
        </ModalDialog>
    );
}