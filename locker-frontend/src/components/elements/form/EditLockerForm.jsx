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


export default function EditLockerForm({ lockerInfo, userId, onSubmission }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openConfirmDeleteLocker, setOpenConfirmDeleteLocker] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const lockerId = lockerInfo.id;
    const [inputValues, setInputValues] = useState({
        name: lockerInfo.name,
        address: lockerInfo.address,
        details: lockerInfo.details
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

        const formData = {
            id: lockerInfo.id,
            name: inputValues.name,
            address: inputValues.address,
            details: inputValues.details
        };

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

            onSubmission.closeModal();
            toast("Locker updated");
            onSubmission.fetchUpdatedLockerDetails();
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDeleteLocker() {
        setOpenConfirmDeleteLocker(false);
        
        let response;

        try {
            response = await fetch(`http://localhost:8080/${userId}/lockers/${lockerId}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                setErrorMessage("Bad request, try again later");
                return;
            }

            onSubmission.closeModal();
            toast("Locker deleted")
            navigate("/lockerlist");
        } catch (error) {
            setErrorMessage(error.message);
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
                        onClick={() => setOpenConfirmDeleteLocker(true)}
                    >
                        Delete Locker
                    </Button>
                    <Modal open={openConfirmDeleteLocker} onClose={() => setOpenConfirmDeleteLocker(false)}>
                        <DeleteForm 
                            onCancel={() => setOpenConfirmDeleteLocker(false)}
                            onProceedDelete={{
                                handleDeleteLocker: () => handleDeleteLocker(),
                                closeModal: () => setOpenConfirmDeleteLocker(false)
                            }}
                        />
                    </Modal>
                </Stack>
            </form>
        </ModalDialog>
    );
}