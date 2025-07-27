import { useState, useContext } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import DeleteForm from './DeleteForm';
import Input from '@mui/joy/Input';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { Textarea } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';


export default function EditLockerForm({ lockerInfo, userId, onSubmission }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputValues, setInputValues] = useState({
        name: lockerInfo.name,
        address: lockerInfo.address,
        details: lockerInfo.details
    });

    console.log(lockerInfo.id);

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
            id: lockerInfo.id,
            name: inputValues.name,
            address: inputValues.address,
            details: inputValues.details
        };

        console.log(formData);

        try {
            response = await fetch(`http://localhost:8080/${userId}/lockers/${lockerId}`, {
                method: 'PUT',
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
            onSubmission.fetchUpdatedLockerDetails();
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }



    return (
        <ModalDialog>
            <DialogTitle>Edit locker</DialogTitle>
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
                    <Button 
                        color="danger"
                    >
                        Delete Locker
                    </Button>
                </Stack>
            </form>
        </ModalDialog>
    );
}