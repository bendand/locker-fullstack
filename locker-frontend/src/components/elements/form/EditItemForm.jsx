import { useState, useContext } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { toast } from 'react-toastify';
import DeleteForm from './DeleteForm';
import { Textarea } from '@mui/joy';
import Modal from '@mui/joy/Modal';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';


export default function EditItemForm({ item, userId, lockerId, containerId, onSubmit, onDelete }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openDeleteItem, setOpenDeleteItem] = useState(false);
    const [inputValues, setInputValues] = useState({
        name: item.name,
        quantity: item.quantity,
        description: item.description
    });

    // function that sets new values when inputs are changed
    function handleInputChange(event) {
        const { name, value } = event.target;

        if (name === 'description' && value.length > 200) return;
        if (name === 'quantity' && value < 1) return;
        
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
            userId,
            lockerId,
            containerId
        };

        try {
            response = await fetch(`http://localhost:8080/${userId}/${lockerId}/${containerId}/items/${item.id}`, {
                method: 'PUT',
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
            onSubmit.closeModal();
            toast('Item updated');
            onSubmit.fetchUpdatedItems();
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDeleteItem() {
        setOpenDeleteItem(false);
        let response;

        try {
            response = await fetch(`http://localhost:8080/${userId}/${lockerId}/${containerId}/items/${item.id}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                console.log("delete request was not ok");
                setErrorMessage("Bad request, try again later");
                return;
            }

            console.log("about to fetch updated items");
            onDelete.fetchUpdatedItems();
            console.log("about to close edit modal");
            onDelete.closeModal();
            toast("Item deleted");
        } catch (error) {
            setErrorMessage(error.message);
        }
    }



    return (
        <ModalDialog>
            <DialogTitle>Edit item</DialogTitle>
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
                    <Button 
                        onClick={() => setOpenDeleteItem(true)}
                        color='danger'
                    >
                        Delete Item
                    </Button>
                </Stack>
            </form>
            <Modal open={openDeleteItem} onClose={() => setOpenDeleteItem(false)} >
                <DeleteForm 
                    unit="item"
                    onCancel={() => setOpenDeleteItem(false)}
                    onProceedDelete={() => handleDeleteItem()}
                />
            </Modal>
        </ModalDialog>
    );
}