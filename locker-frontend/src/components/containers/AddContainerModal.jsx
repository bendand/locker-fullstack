import { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import Button from '../elements/button/Button';

const AddContainerModal = forwardRef(function AddContainerModal({
    lockerId,
    onCancel,
    onAdd },
    ref) {

    const [containerName, setContainerName] = useState('');
    const dialog = useRef();

    function handleNameChange(event) {
        setContainerName(event.target.value);
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

    // uses form data to post new container
    function handleSubmit(formData) {
        const name = formData.get("container-name");

        fetch(`https://locker-api-uoib.onrender.com/lockers/${lockerId}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            const newContainer = {
                "containerName": name,
                "containerItems": []
            }

            console.log(newContainer);
            // spread operator used to populate current data, add new container to array
            const updatedContainers = [...data.lockerContainers, newContainer];
            
            // patch method used to make updates to containers data
            return fetch(`https://locker-api-uoib.onrender.com/lockers/${lockerId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ lockerContainers: updatedContainers })
            });
        })
        .then(res => {
            return res.json();
        })
        .then(updatedLockers => {
            setContainerName('');
            dialog.current.close();
            toast('Container Added!');
            onAdd();
        });
    }

    return createPortal(
        <dialog ref={dialog} className='modal'>
            <div>
                <Button onClick={onCancel}>X</Button>
            </div>
            <p>Choose a unique container name.</p>
            <form action={handleSubmit}>
                <div className="form-input">
                    <label htmlFor="container-name">Container name: </label>
                    <input 
                        name='container-name'
                        value={containerName}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div>
                    <Button type='submit'>Add Container</Button>
                </div>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    );
});


export default AddContainerModal