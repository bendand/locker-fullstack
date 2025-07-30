import { useState, useContext } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import { Textarea } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import DeleteForm from './DeleteForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';


export default function EditContainerForm({ lockerId, lockerName, containerInfo, userId, onSubmission }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openConfirmDeleteContainer, setOpenConfirmDeleteContainer] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const containerId = containerInfo.id;
    const [inputValues, setInputValues] = useState({
        name: containerInfo.name,
        description: containerInfo.description
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

        const formData = {
            name: inputValues.name,
            description: inputValues.description
        };

        try {
            response = await fetch(`http://localhost:8080/${userId}/${lockerId}/containers/${containerId}`, {
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

            onSubmission.closeModal();
            toast("Container updated");
            onSubmission.fetchUpdatedContainerDetails();
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDeleteContainer() {
        setOpenConfirmDeleteContainer(false);
        let response;

        try {
            response = await fetch(`http://localhost:8080/${userId}/${lockerId}/containers/${containerId}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                setErrorMessage("Bad request, try again later");
                return;
            }

            onSubmission.closeModal();
            toast("Container deleted");
            navigate(`/lockerlist/${lockerId}/${lockerName}`);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }


    return (
        <ModalDialog>
            <DialogTitle>Edit container</DialogTitle>
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
                            name='description'
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
                    <Button 
                        color="danger"
                        onClick={() => setOpenConfirmDeleteContainer(true)}
                    >
                        Delete Container
                    </Button>
                    <Modal open={openConfirmDeleteContainer} onClose={() => setOpenConfirmDeleteContainer(false)}>
                        <DeleteForm 
                            unit="container"
                            onCancel={() => setOpenConfirmDeleteContainer(false)}
                            onProceedDelete={() => handleDeleteContainer()}
                        />
                    </Modal>
                </Stack>
            </form>
        </ModalDialog>
    );
}