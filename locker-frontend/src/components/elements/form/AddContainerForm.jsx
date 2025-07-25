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


export default function AddContainerForm({ userId, lockerId, onSubmission }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputValues, setInputValues] = useState({
        name: '',
        description: ''
    });

    // function that sets new values when inputs are changed
    function handleInputChange(event) {
        const { name, value } = event.target;

        if (name === 'description' && value.length > 200) return;
        
        setInputValues(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmitContainer() {
        setIsSubmitting(true);

        let response;
        let containerData;

        const formData = {
            name: inputValues.name,
            description: inputValues.description
        };

        console.log(formData);

        try {
            response = await fetch(`http://localhost:8080/${userId}/${lockerId}/containers/add`, {
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

            containerData = await response.json();
            onSubmission.setOpen();
            onSubmission.fetchUpdatedContainers();
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }



    return (
        <ModalDialog>
            <DialogTitle>Add a container</DialogTitle>
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
                        <FormLabel>Description (optional, max 200 characters)</FormLabel>
                        <Textarea
                            placeholder="Details about container, its appearance, location in locker, etc."
                            minRows={2}
                            maxRows={4}
                            name='details'
                            value={inputValues.description}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <Button 
                        type="submit"
                        onClick={handleSubmitContainer}
                        loading={isSubmitting}
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
        </ModalDialog>
    );
}