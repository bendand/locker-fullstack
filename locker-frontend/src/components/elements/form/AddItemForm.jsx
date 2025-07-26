import { useState, useContext } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { toast } from 'react-toastify';
import { Textarea } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';


export default function AddItemForm({ userId, lockerId, containerId, onSubmission }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputValues, setInputValues] = useState({
        name: '',
        quantity: 1,
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

    async function handleSubmitItem() {
        setIsSubmitting(true);

        let response;
        let itemData;

        const formData = {
            name: inputValues.name,
            description: inputValues.description,
            quantity: inputValues.quantity,
            userId: userId,
            lockerId: lockerId,
            containerId: containerId
        };

        try {
            response = await fetch(`http://localhost:8080/${userId}/${lockerId}/${containerId}/items/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                setIsSubmitting(false);
                setErrorMessage("Bad request, try again later");
                return;
            }

            itemData = await response.json();
            console.log('heres the item data received after item submission: ' + itemData);
            onSubmission.setOpen();
            // not working
            toast('Item added');
            onSubmission.fetchUpdatedItems();
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }



    return (
        <ModalDialog>
            <DialogTitle>Add an item</DialogTitle>
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
                            placeholder="Details about item, its appearance, condition, etc."
                            minRows={2}
                            maxRows={4}
                            name='description'
                            value={inputValues.description}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl>                
                        <FormLabel>Quantity</FormLabel>
                        <Input
                            defaultValue="1"
                            type="number"
                            name='quantity'
                            value={inputValues.quantity}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <Button 
                        type="submit"
                        onClick={handleSubmitItem}
                        loading={isSubmitting}
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
        </ModalDialog>
    );
}