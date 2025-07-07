import { useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import Button from '../elements/button/Button';


const AddLockerModal = forwardRef(function AddLockerModal({ 
    onCancel, 
    onAdd }, 
    ref) {

    const [inputValues, setInputValues] = useState({
        lockerName: '',
        lockerAddress: ''
    });

    const dialog = useRef();

    // function that sets new values when inputs are changed
    function handleInputChange(event) {
        const { name, value } = event.target;
        
        setInputValues(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    // uses form data to add new locker to json file
    function handleSubmit(formData) {
        const name = formData.get("lockerName");
        const address = formData.get("lockerAddress");
        const url = "https://locker-api-uoib.onrender.com/lockers";

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lockerName: name,
                lockerAddress: address,
                lockerContainers: []
            })
        });

        dialog.current.close();
        onAdd();
        toast('Locker Added!');
    }

    // hook that exposes methods used to control modal
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            }
        };
    });


    return createPortal(
        <dialog ref={dialog} className='modal'>
            <div className="modal">
                <Button 
                    onClick={onCancel}
                >
                    X
                </Button>
                <form action={handleSubmit} id="locker-form">
                    <div className='form-input'>
                        <label htmlFor="name">Locker Name: </label>
                        <input
                            type="text" 
                            name="lockerName" 
                            value={inputValues.lockerName}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    <div className='form-input'>
                        <label htmlFor="address">Locker Address: </label>
                        <input
                            type="text" 
                            name="lockerAddress"
                            value={inputValues.lockerAddress}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    <div>
                        <Button type="submit">Add Locker</Button>
                    </div>
                </form>
            </div>
        </dialog>,
        document.getElementById('modal-root')
    );
});

export default AddLockerModal