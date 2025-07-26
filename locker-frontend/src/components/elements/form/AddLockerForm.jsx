import { useState, useContext } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { Textarea } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';


export default function AddLockerForm({ userId, onSubmission }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputValues, setInputValues] = useState({
        name: '',
        address: '',
        details: ''
    });

    // function that sets new values when inputs are changed
    function handleInputChange(event) {
        const { name, value } = event.target;

        if (name === 'details' && value.length > 200) return;
        
        setInputValues(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmitLocker() {
        setIsSubmitting(true);

        let response;
        let lockerData;

        const formData = {
            name: inputValues.name,
            address: inputValues.address,
            details: inputValues.details
        };

        console.log(formData);

        try {
            response = await fetch(`http://localhost:8080/${userId}/lockers/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                if (response.status === 404) {
                    setErrorMessage("User not found")
                } else {
                    setErrorMessage("Bad request, try again later");
                }
                setIsSubmitting(false);
                return;
            }

            lockerData = await response.json();
            onSubmission.setOpen();
            onSubmission.fetchUpdatedLockers();
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }



    return (
        <ModalDialog>
            <DialogTitle>Add a locker</DialogTitle>
            <form>
                <Stack spacing={2}>
                    {errorMessage && (
                        <p>{errorMessage}</p>
                    )}
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
                        <FormLabel>Details (optional, max 200 characters)</FormLabel>
                        <Textarea
                            placeholder="Details about location, access codes, special instructions, etc..."
                            minRows={2}
                            maxRows={4}
                            name='details'
                            value={inputValues.details}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <Button 
                        type="submit"
                        onClick={handleSubmitLocker}
                        loading={isSubmitting}
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
        </ModalDialog>
    );
}